import React from 'react';

const LogFoodListItem = ({ name, amount, unit, protein, carbohydrates, fat, calories, id }) => (
  <div className="logFoodListItem">
    <p className="logFoodListItem__text">{name}</p>
    <p className="logFoodListItem__text">{amount} {unit}</p>
    <p className="logFoodListItem__text">{carbohydrates}</p>
    <p className="logFoodListItem__text">{protein}</p>
    <p className="logFoodListItem__text">{fat}</p>
    <p className="logFoodListItem__text">{calories}</p>
  </div>
);

export default LogFoodListItem;
