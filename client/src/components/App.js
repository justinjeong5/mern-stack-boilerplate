import React from 'react';
import { Route, Switch } from 'react-router-dom'

import MainPage from '../components/MainPage/MainPage'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
