import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Foods from '../components/Foods/Foods';
import Logs from '../components/Logs/Logs';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import LoginPage from '../components/LoginPage/LoginPage';
import EditLog from '../components/EditLog/EditLog';
import Info from '../components/Info/Info';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch> 
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/Foods" component={Foods} />
        <PrivateRoute path="/Logs" component={Logs} />
        <PrivateRoute path="/EditLog" component={EditLog} />
        <PrivateRoute path="/Info" component={Info} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;