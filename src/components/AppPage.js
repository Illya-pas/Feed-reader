import React from 'react'
import ArticleForm from './ArticleForm'
import {Articles} from './Articles'
import FetchedArticles from './FetchedArticles'
import {LoginButton} from './LoginButton'

export default function AppPage () {

  let isAuth
  const user = JSON.parse(localStorage.getItem('user'))
  if (user != null) {
    isAuth = true
  } else {
    isAuth = false
  }

  return (
    <>
      <LoginButton isAuth = {isAuth} />

        <div className="row">
          <div className="col">
            <ArticleForm />
          </div>
        </div>

        <div className="row">
          <div className="col mt-3">
            <h3 className="pb-2">Our Articles</h3>
            <Articles />
          </div>

          <div className="server col mt-3">
            <h3>Server Articles</h3>
            <FetchedArticles/>
          </div>
        </div>
    </>
  )
}