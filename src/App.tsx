import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';

export default () =>
  <Switch>
    <Route path="/" component={Home} exact>
      <Home />
    </Route>
    <Route path="/games/:id" component={Game}>
      <Game />
    </Route>
  </Switch>