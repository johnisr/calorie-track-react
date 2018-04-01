import React from "react";
import { Router, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import FoodDashboardPage from '../components/FoodDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import AddFoodPage from '../components/AddFoodPage';
import EditFoodPage from '../components/EditFoodPage';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch> 
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/FoodDashboard" component={FoodDashboardPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;