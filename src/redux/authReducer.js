import {SET_USER_DATA} from './types'

const initialState = {
	id: null,
	username: null,
	email: null,
	authorized: false
}

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_DATA:
			return {...state, ...action.payload}
		default: return state
	}
}