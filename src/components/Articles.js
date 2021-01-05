import React, {useEffect} from 'react'
import Article from './Article'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import {getUserArticles} from '../redux/actions'

const Articles = ({articles}) => {
	const user = JSON.parse(localStorage.getItem('user'))
	const dispatch = useDispatch()

	dispatch(getUserArticles(user))
	  if (!articles.length) {
			return <p className="text-center">No articles yet...</p>
		}
		return articles.map(article => <Article key={article.id} article={article}/>)
	  }

const mapStateToProps = state => {
	return {
		articles: state.articles.articles
	}
}

export default connect(mapStateToProps, null)(Articles)