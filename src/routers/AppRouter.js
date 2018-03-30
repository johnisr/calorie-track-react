import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Home from '../components/Home';
import About from '../components/About';
import Topics from '../components/Topics';
import CountPage from '../components/CountPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch> 
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/about" component={About} />
        <PrivateRoute path="/topics" component={Topics} />
        <PrivateRoute path="/count" component={CountPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;