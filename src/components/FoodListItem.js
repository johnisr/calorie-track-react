import React from 'react';

const FoodListItem = ({ name, amount, unit, protein, carbohydrates, fat, calories, id, handleClick }) => (
  <div>
    <p>{name} - {amount} {unit}</p>
    <p>Carbs: {carbohydrates} Protein: {protein} Fat: {fat} Calories: {calories}</p>
  </div>
);

export default FoodListItem;
