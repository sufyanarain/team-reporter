import SigupPage from './components/signup/Signup'
import LoginPage from './components/login/LoginPage'
import Teams from './components/teamsPage/Teams'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import  {Settings}  from './components/settings/Settings.js'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/Signup">
            <SigupPage />
          </Route>
          <Route path="/Teams">
            <Teams />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
