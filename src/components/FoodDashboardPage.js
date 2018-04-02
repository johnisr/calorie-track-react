import React from 'react';
import FoodList from './FoodList';
import EditFood from './EditFood';
import AddFood from './AddFood';

const FoodDashboardPage = () => (
  <div>
    <FoodList />
    <AddFood />
    <EditFood />
  </div>
);

export default FoodDashboardPage;