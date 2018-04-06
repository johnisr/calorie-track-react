import React from 'react';
import FoodsDisplayList from './FoodsDisplayList';
import EditFoodFormForFoods from './EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

const FoodDashboardPage = () => (
  <div className="container">
    <Header history={history}/>
    <FoodsDisplayList />
    <AddFoodFormToFoods />
    <EditFoodFormForFoods  />
  </div>
);

export default FoodDashboardPage;