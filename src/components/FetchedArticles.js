import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FetchedArticle from './FetchedArticle'
import {fetchArticles} from '../redux/actions'
import {Loader} from './Loader'

export default () => {
	const dispatch = useDispatch()
	const fetchedArticles = useSelector(state => state.articles.serverArticles)
	const loading = useSelector(state => state.app.loading)

	useEffect(() => {
		dispatch(fetchArticles())
	}, [])

	if (loading) {
		return <Loader size={40}/>
	}

	if (!fetchedArticles.length) {
		return <p className="text-center">No server articles yet...</p> 
	}
	return fetchedArticles.map(article => <FetchedArticle key={article.id} article={article}/>)
}