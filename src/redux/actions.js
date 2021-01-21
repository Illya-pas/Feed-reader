import {
	CREATE_ARTICLE,
	DELETE_ARTICLE,
	FETCH_ARTICLES,
	PROXY_URL,
	HIDE_LOADER,
	SHOW_LOADER,
	SHOW_ALERT,
	HIDE_ALERT,
	SET_USER_DATA,
	FETCH_USER_ARTICLES,
	SET_CURRENT_ARTICLE,
} from "./types";

let CHECK_AUTH = false;

export function createArticle(article) {
	return async (dispatch) => {
		const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + article.id, {
			method: 'PUT',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(article)
		});
		const jsonArt = await res.json()

		dispatch({
			type: CREATE_ARTICLE,
			payload: jsonArt,
		});
		console.log(jsonArt)
	}
}

export function deleteArticle(article) {
	return async (dispatch) => {
		const deleted = await fetch("https://jsonplaceholder.typicode.com/posts/" + article.id, {
			method: 'DELETE',
			body: JSON.stringify(article),
			headers:{
				'Content-Type':'application/json'
			},
		});
		const deletedJson = await deleted.json()
		console.log(deletedJson)

		dispatch({
			type: DELETE_ARTICLE,
			payload: article.id,
		});
		console.log(article.id)
	}
}

export function hideLoader() {
	return {
		type: HIDE_LOADER,
	};
}

export function showLoader() {
	return {
		type: SHOW_LOADER,
	};
}

export function showAlert(alertText) {
	return (dispatch) => {
		dispatch({
			type: SHOW_ALERT,
			payload: alertText,
		});
		setTimeout(() => {
			dispatch(hideAlert());
		}, 3000);
	};
}

export function hideAlert() {
	return {
		type: HIDE_ALERT,
	};
}

export function redirect(link) {
	return (window.location.href = link);
}

export function getUser() {
	return JSON.parse(localStorage.getItem('user'))
}

export function fetchRssArticles() {
	return async () => {
		let serverArticles = [];
		const response = await fetch(
			PROXY_URL + "https://www.nasa.gov/rss/dyn/breaking_news.rss"
		);
		const text = await response.text();
		const doc = await new window.DOMParser().parseFromString(text, "text/xml");
		const items = await doc.querySelectorAll("item");

		items.forEach((item) => {
			let article = {
				id: item.getElementsByTagName("dc:identifier")[0].innerHTML,
				title: item.querySelector("title").innerHTML,
				body: item.querySelector("description").innerHTML,
				img: item.querySelector("enclosure").getAttribute("url"),
				pubDate: item.querySelector("pubDate").innerHTML,
			};
			serverArticles.push(article);
		})
		return serverArticles
	};
}

export function getRssArticles(itemId) {
	return async (dispatch) => {
		let count = 0
		const fArticles = await dispatch(fetchRssArticles())
		fArticles.map(fArtic => {
			count++
			if (itemId === fArtic.id) {
				return dispatch({ type: SET_CURRENT_ARTICLE, payload: fArtic })
			} else if ((itemId !== fArtic.id) && (count === fArtic.length)){
				return dispatch({ type: SET_CURRENT_ARTICLE, payload: null })
			} else {
				return
			}
		})
		dispatch(hideLoader());
	};
}

export function fetchArticles() {
	return async (dispatch) => {
		const serverArticles = await dispatch(fetchRssArticles())

		dispatch({ type: FETCH_ARTICLES, payload: serverArticles });
		dispatch(hideLoader());
	};
}

export function authUser(userData) {
	return async (dispatch) => {
		console.log(userData)
		const responseData = await fetch("https://jsonplaceholder.typicode.com/users");
		const jsonData = await responseData.json();
		jsonData.forEach((serverUser) => {
			if (
				serverUser.username === userData.username &&
				serverUser.email === userData.email
			) {
				let userInfo = {
					id: serverUser.id,
					username: serverUser.username,
					email: serverUser.email,
					authorized: true,
				};
				dispatch({
					type: SET_USER_DATA,
					payload: userInfo,
				});
				localStorage.setItem("user", JSON.stringify(userInfo));

				dispatch(redirect("http://localhost:3000/"));

				CHECK_AUTH = true;
			} else if (serverUser.id === jsonData.length - 1 && !CHECK_AUTH) {
				return dispatch(showAlert("Incorrect Username or Password"));
			} else {
				return;
			}
		});
	};
}

export function getUserArticles(loggedUser) {
	return async (dispatch) => {
		if (loggedUser != null) {
			const responseArticles = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			);
			const userArticles = await responseArticles.json();
			const initialArticles = [];
			userArticles.map((userArticle) => {
				if (
					userArticle.userId === loggedUser.id &&
					initialArticles.length < 3
				) {
					return initialArticles.push(userArticle);
				}
			});
			dispatch({ type: FETCH_USER_ARTICLES, payload: initialArticles });
		} else {
			return;
		}
	};
}