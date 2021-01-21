import './App.scss'
import AppPage from './components/AppPage'
import {LoginPage} from './components/LoginPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {FetchedArticlePage} from './components/FetchedArticlePage'
import {NotFound} from './components/NotFound'


function App() {
  return (
    <div className="main-block bg-dark">
      <div className="container pt-3 main-block-container">
        <Router>
          <Switch>
            <Route exact path='/' component={AppPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/article/' component={FetchedArticlePage}/>
            <Route path='/' component={NotFound}/>
          </Switch>
        </Router>
      </div>
    </div>
  )
}



export default App;
