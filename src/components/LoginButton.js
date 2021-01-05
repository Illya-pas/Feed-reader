import React from 'react'
import {NavLink} from 'react-router-dom'
import {SET_USER_DATA} from '../redux/types'
import {useDispatch} from 'react-redux'


export const LoginButton = (props) => {
	const dispatch = useDispatch()

	return (
		<>
			{props.isAuth ? (
        <div className="row float-right m-2">
          <NavLink 
          	to="/login" 
          	onClick={() => {dispatch({
    					type: SET_USER_DATA,
    					payload: {
    						id: null,
								username: null,
								email: null,
								authorized: false
    					}
    				})
          localStorage.removeItem('user')}}
    				className="btn btn-danger">Logout</NavLink>
        </div>
      ) : (
        <div className="row float-right m-2">
          <NavLink to="/login" className="btn btn-success">Login</NavLink>
        </div>
       )}
    </>
	)
}