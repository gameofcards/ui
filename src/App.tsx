import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import React from 'react';

export default () => (
  <Switch>
    <Route path="/" component={Home} exact>
      <Home />
    </Route>
  </Switch>
);
