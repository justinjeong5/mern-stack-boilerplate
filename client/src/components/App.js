import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LandingPage from './Main/LandingPage'
import RegisterPage from './User/RegisterPage'
import LoginPage from './User/LoginPage'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;