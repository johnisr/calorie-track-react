import React from 'react';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import EditFoodFormForFoods from './EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods';
import FoodListFilters from './FoodListFilters';

const FoodDashboardPage = () => (
  <div>
    <FoodListFilters />
    <FoodListDisplayFoods />
    <AddFoodFormToFoods />
    <EditFoodFormForFoods />
  </div>
);

export default FoodDashboardPage;