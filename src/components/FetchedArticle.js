import React from 'react'

export default function FetchedArticle({article}) {
	return (
		<div className="card mt-2">
			<div className="card-body">
				<h5 className="card-title">{article.title.slice(0,100)}</h5>
				<p className="card-text">{article.pubDate}</p>
			</div>
		</div>
	)
}