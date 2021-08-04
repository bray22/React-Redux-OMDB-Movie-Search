import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';
import Error from './components/Error';
import Search from './components/Search';
import Details from './components/Details';
import WatchList from './components/WatchList';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/watchlist" component={WatchList}  />
      <Route path="/search" component={Search} />
      <Route path="/details" component={Details} />
      <Route path="/error" component={Error} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
