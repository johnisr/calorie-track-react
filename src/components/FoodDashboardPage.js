import React from 'react';
import FoodList from './FoodList';
import EditFoodPage from './EditFoodPage';
import AddFoodPage from './AddFoodPage';

class FoodDashboardPage extends React.Component {

  render() {
    return (
      <div>
        <FoodList />
        <AddFoodPage />
        <EditFoodPage />
      </div>
    );
  }
};

export default FoodDashboardPage;