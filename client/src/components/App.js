import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LandingPage from './Main/LandingPage'
import RegisterPage from './User/RegisterPage'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/register' component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;