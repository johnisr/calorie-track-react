import React from 'react';
import FoodList from './FoodList';
import EditFood from './EditFood';
import AddFood from './AddFood';

class FoodDashboardPage extends React.Component {

  render() {
    return (
      <div>
        <FoodList />
        <AddFood />
        <EditFood />
      </div>
    );
  }
};

export default FoodDashboardPage;