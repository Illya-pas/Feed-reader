import {CREATE_ARTICLE, DELETE_ARTICLE, FETCH_ARTICLES, FETCH_USER_ARTICLES, SET_CURRENT_ARTICLE} from './types'

const initialState = {
	articles: [],
	serverArticles: [],
	currentArticle: null,
}

export const articlesReducer = (state = initialState, action) => {
	switch(action.type) {
		case CREATE_ARTICLE:
			return {...state, articles: state.articles.concat([action.payload])}
		case DELETE_ARTICLE:
			return {...state, articles: state.articles.filter(article => article.id !== action.payload)}
		case FETCH_ARTICLES:
			return {...state, serverArticles: action.payload}
		case FETCH_USER_ARTICLES:
			return {...state, articles: action.payload}
		case SET_CURRENT_ARTICLE:
			return {...state, currentArticle: action.payload}
		default: return state
	}
}