import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getRssArticles} from "../redux/actions";
import {NavLink} from 'react-router-dom'
import {NotFound} from './NotFound'
import {Loader} from './Loader'
import { showLoader } from "../redux/actions";

export const FetchedArticlePage = () => {
	const dispatch = useDispatch()
	const itemId = window.location.href.slice(30, window.location.href.length)
	const loading = useSelector(state => state.app.loading)

	useEffect(() => {
		dispatch(getRssArticles(itemId))
	}, [])

	const currentArticle = useSelector((state) => state.articles.currentArticle);

	if (loading) {
		return (
			<div className="loader-div">
				<Loader size={120}/>
			</div>
		)
	} else if (currentArticle === null) {
		return (
			<NotFound />
		)
	}
	return(
		<div>
      <div className="card current-article">
				<img src={currentArticle.img} className="card-img-top" alt=""/>
					<div className="card-body">
					  <div>
					    <h4 className="card-title">{currentArticle.title}</h4>
					    <p className="card-text">{currentArticle.body}</p>
					    <p className="card-text">{currentArticle.pubDate}</p>
					  </div>
					  <NavLink to="/" className="btn btn-primary"
					  onClick={() => dispatch(showLoader())}>To main</NavLink>
				  </div>
			</div>
    </div>
  )
}
