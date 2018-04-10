import React from 'react';
import './logFoodListDisplay.css';

const FoodListDisplayCurrentLog = (props) => {

  const header = () => (
    <div className="logFoodListDisplay__list-header">
      <p className="logFoodListDisplay__list-title">name</p>
      <p className="logFoodListDisplay__list-title">amount</p>
      <p className="logFoodListDisplay__list-title">carbs</p>
      <p className="logFoodListDisplay__list-title">protein</p>
      <p className="logFoodListDisplay__list-title">fat</p>
      <p className="logFoodListDisplay__list-title">calories</p>
    </div>
  );

  const createTable = () => (
    props.foods.map((food, index) => (
      <div 
        key={`div ${food.index}`}
        className={index % 2 === 0 ? 
          "logFoodListDisplay__list-table" : 
          "logFoodListDisplay__list-table logFoodListDisplay__list-table--even"}
      >
        {listItem(food)}
        {listOptions(food)}
      </div>
    ))
  );

  const listItem = (food) => (
    <div className="logFoodListDisplay__item">
      <p className="logFoodListDisplay__item-text">{food.name}</p>
      <p className="logFoodListDisplay__item-text">{food.amount} {food.unit}</p>
      <p className="logFoodListDisplay__item-text">{food.carbohydrates}</p>
      <p className="logFoodListDisplay__item-text">{food.protein}</p>
      <p className="logFoodListDisplay__item-text">{food.fat}</p>
      <p className="logFoodListDisplay__item-text">{food.calories}</p>
    </div>
  );

  const listOptions = (food) => (
    <div className="logFoodListDisplay__list-options">
      {
        food.multiplier !== undefined ? (
          <input
            type="text"
            className="logFoodListDisplay__list-multiplier"
            placeholder="servings"
            value={props.foods[food.index].multiplier}
            onChange={(e) => props.onMultiplierChange(food.index, e)}
            />
        ) : (
          <button
            className="btn logFoodListDisplay__list-btn flex-right-end"
            onClick={() => props.onEdit(food.index)}
          >
            Edit
          </button>
        )
      }
      <button
        className="btn logFoodListDisplay__list-btn"
        key={`button ${food.index}`} 
        onClick={() => props.onRemove(food.index)}
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="logFoodListDisplay">
      <h3 className="heading-secondary logFoodListDisplay__header">Foods in Current Log</h3>
      {
        props.foods === undefined || props.foods.length === 0 ? (
          <p className="heading-secondary logFoodListDisplay__header">No Foods</p>
        ) : (
          <div className="logFoodListDisplay__list">
            {header()}
            {createTable()}
          </div>
        )
      }
    </div>
  );
};

export default FoodListDisplayCurrentLog;