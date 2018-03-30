import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';

export const FoodList = props => (
  <div>
    {
      props.foods.length === 0 ? (
        <p>No Foods</p>
      ) : (
        props.foods.map(food => (
          <FoodListItem key={food.id} {...food} />
        ))
      )
    }
  </div>
);

const objectIn = state => ({
  foods: state.foods,
});

export default connect(objectIn)(FoodList);
