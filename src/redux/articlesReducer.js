import {CREATE_ARTICLE, FETCH_ARTICLES, FETCH_USER_ARTICLES} from './types'

const initialState = {
	articles: [],
	serverArticles: []
}

export const articlesReducer = (state = initialState, action) => {
	switch(action.type) {
		case CREATE_ARTICLE:
			return {...state, articles: state.articles.concat([action.payload])}
		case FETCH_ARTICLES:
			return {...state, serverArticles: action.payload}
		case FETCH_USER_ARTICLES:
			return {...state, articles: action.payload}
		default: return state
	}
}