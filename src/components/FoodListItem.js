import React from 'react';
import { Link } from 'react-router-dom';

const FoodListItem = ({ name, amount, unit, protein, carbohydrates, fat, calories, id }) => (
  <div>
    <p>{name} - {amount} {unit}</p>
    <p>Carbs: {carbohydrates} Protein: {protein} Fat: {fat} Calories: {calories}</p>
    <Link to={`editFood/${id}`}>Edit this</Link>
  </div>
);

export default FoodListItem;
