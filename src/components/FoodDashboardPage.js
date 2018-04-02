import React from 'react';
import FoodListDisplayFoods from './FoodListDisplayFoods';
import EditFoodFormForFoods from './EditFoodFormForFoods';
import AddFoodFormToFoods from './AddFoodFormToFoods';

const FoodDashboardPage = () => (
  <div>
    <FoodListDisplayFoods />
    <AddFoodFormToFoods />
    <EditFoodFormForFoods />
  </div>
);

export default FoodDashboardPage;