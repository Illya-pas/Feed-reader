import React, {useEffect} from 'react'
import Article from './Article'
import {useDispatch, useSelector} from 'react-redux'
import {getUser,getUserArticles} from '../redux/actions'

export const Articles = () => {
	const articles = useSelector(state => state.articles.articles)
	const user = getUser()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserArticles(user))
	}, [])
	
	  if (!articles.length) {
			return <p className="text-center">No articles yet...</p>
		}
		return articles.map(article => <Article key={article.id} article={article}/>)
	  }