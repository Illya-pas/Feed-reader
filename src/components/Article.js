import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteArticle} from '../redux/actions'

export default function Article({article}) {
	const dispatch = useDispatch()

	return (
		<div className="card mt-2">
			<div className="card-body pt-1 pl-4">
				<div className="row flex-nowrap">
					<h5 className="card-title col pt-3 pl-0">{article.title.slice(0,100)}</h5>
					<button onClick={() => dispatch(deleteArticle(article))} className="btn btn-warning col-sm-1 mb-3">&#10060;</button>
				</div>
				<p className="card-text row">{article.body.slice(0,200)+'...'}</p>
			</div>
		</div>
	)
}