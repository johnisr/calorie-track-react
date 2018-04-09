import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import FoodDashboardPage from '../components/Foods/FoodDashboardPage';
import LogDashboardPage from '../components/Logs/LogDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import EditLog from '../components/EditLog/EditLog';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch> 
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/FoodDashboard" component={FoodDashboardPage} />
        <PrivateRoute path="/LogDashboard" component={LogDashboardPage} />
        <PrivateRoute path="/EditLog" component={EditLog} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;