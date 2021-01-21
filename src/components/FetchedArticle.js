import React from 'react'
import {NavLink} from 'react-router-dom'
import { showLoader } from "../redux/actions";
import {useDispatch} from 'react-redux'

export default function FetchedArticle({article}) {
	const dispatch = useDispatch()
	
	return (
		<NavLink to={"/article/" + article.id} className="card mt-2"
			onClick={() => dispatch(showLoader())}>
			<div className="card-body">
				<h5 className="card-title">{article.title.slice(0,100)}</h5>
				<p className="card-text">{article.pubDate}</p>
			</div>
		</NavLink>
	)
}