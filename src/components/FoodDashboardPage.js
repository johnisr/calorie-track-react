import React from 'react';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import EditFoodFormForFoods from './EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods';
import FoodListFilters from './FoodListFilters';
import Header from '../components/Header';
import { history } from '../routers/AppRouter';

const FoodDashboardPage = () => (
  <div className="container">
    <Header history={history}/>
    <FoodListFilters  />
    <FoodListDisplayFoods />
    <AddFoodFormToFoods />
    <EditFoodFormForFoods  />
  </div>
);

export default FoodDashboardPage;