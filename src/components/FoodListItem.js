import React from 'react';

const FoodListItem = ({ name, amount, unit, protein, carbohydrates, fat, calories, id }) => (
  <div className="listItem">
    <p className="listItem__text">{name}</p>
    <p className="listItem__text">{amount} {unit}</p>
    <p className="listItem__text">{carbohydrates}</p>
    <p className="listItem__text">{protein}</p>
    <p className="listItem__text">{fat}</p>
    <p className="listItem__text">{calories}</p>
  </div>
);

export default FoodListItem;
