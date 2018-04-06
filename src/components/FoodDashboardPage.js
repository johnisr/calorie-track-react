import React from 'react';
import FoodsDisplayList from './FoodsDisplayList';
import FoodsDisplayTabs from './FoodsDisplayTabs';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

const FoodDashboardPage = () => (
  <div className="container">
    <Header history={history}/>
    <FoodsDisplayList />
    <FoodsDisplayTabs />
  </div>
);

export default FoodDashboardPage;