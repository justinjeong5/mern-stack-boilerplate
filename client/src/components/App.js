import React from 'react';
import { Route, Switch } from 'react-router-dom'

import auth from '../hoc/Authentication'
import NavBar from './Header/NavBar'
import Footer from './Footer/Footer'
import LandingPage from './Main/LandingPage'
import RegisterPage from './User/RegisterPage'
import LoginPage from './User/LoginPage'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={auth(LandingPage, null)} />
        <Route exact path='/register' component={auth(RegisterPage, false)} />
        <Route exact path='/login' component={auth(LoginPage, false)} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;