import {HIDE_LOADER, SHOW_ALERT, HIDE_ALERT, SHOW_LOADER} from './types'

const initialState = {
	loading: true,
	alert: null,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case HIDE_LOADER:
			return {...state, loading: false}
		case SHOW_LOADER:
			return {...state, loading: true}
		case SHOW_ALERT:
			return {...state, alert: action.payload}
		case HIDE_ALERT:
		return {...state, alert: null}
		default: return state
	}
}