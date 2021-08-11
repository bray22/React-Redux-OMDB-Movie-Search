import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';
import Details from './components/Details';
import WatchList from './components/WatchList';

const Router = (props) => (
  /* Define valid routes for browser  */
  <BrowserRouter>
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/details" component={Details} />
      <Route path="/watchlist" component={WatchList} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
