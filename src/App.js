import './App.scss'
import AppPage from './components/AppPage'
import LoginPage from './components/LoginPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div className="main-block bg-dark">
      <div className="container pt-3">
        <Router>
          <Switch>
            <Route exact path='/' component={AppPage}/>
            <Route path='/login' component={LoginPage}/>
          </Switch>
        </Router>
      </div>
    </div>
  )
}



export default App;
