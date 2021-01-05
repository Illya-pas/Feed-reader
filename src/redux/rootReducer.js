import {combineReducers} from 'redux'
import {articlesReducer} from './articlesReducer'
import {appReducer} from './appReducer'
import {authReducer} from './authReducer'

export const rootReducer = combineReducers({
	articles: articlesReducer,
	app: appReducer,
	auth: authReducer
})