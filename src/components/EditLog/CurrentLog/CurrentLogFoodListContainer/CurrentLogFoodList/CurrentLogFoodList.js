import React from 'react';
import './CurrentLogFoodList.css';

const CurrentLogFoodList = (props) => {

  const header = () => (
    <div className="currentLogFoodList__list-header">
      <p className="currentLogFoodList__list-title">name</p>
      <p className="currentLogFoodList__list-title">amount</p>
      <p className="currentLogFoodList__list-title">carbs</p>
      <p className="currentLogFoodList__list-title">protein</p>
      <p className="currentLogFoodList__list-title">fat</p>
      <p className="currentLogFoodList__list-title">calories</p>
    </div>
  );

  const createTable = () => (
    props.foods.map((food, index) => (
      <div 
        key={`div ${food.index}`}
        className={index % 2 === 0 ? 
          "currentLogFoodList__list-table" : 
          "currentLogFoodList__list-table currentLogFoodList__list-table--even"}
      >
        {listItem(food)}
        {listOptions(food)}
      </div>
    ))
  );

  const listItem = (food) => (
    <div className="currentLogFoodList__item">
      <p className="currentLogFoodList__item-text">{food.name}</p>
      <p className="currentLogFoodList__item-text">{food.amount} {food.unit}</p>
      <p className="currentLogFoodList__item-text">{food.carbohydrates}</p>
      <p className="currentLogFoodList__item-text">{food.protein}</p>
      <p className="currentLogFoodList__item-text">{food.fat}</p>
      <p className="currentLogFoodList__item-text">{food.calories}</p>
    </div>
  );

  const listOptions = (food) => (
    <div className="currentLogFoodList__list-options">
      {
        food.multiplier !== undefined ? (
          <input
            type="text"
            className="currentLogFoodList__list-multiplier"
            placeholder="servings"
            value={props.foods[food.index].multiplier}
            onChange={(e) => props.onMultiplierChange(food.index, e)}
            />
        ) : (
          <button
            className="btn currentLogFoodList__list-btn flex-right-end"
            onClick={() => props.onEdit(food.index)}
          >
            Edit
          </button>
        )
      }
      <button
        className="btn currentLogFoodList__list-btn"
        key={`button ${food.index}`} 
        onClick={() => props.onRemove(food.index)}
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="currentLogFoodList">
      <h3 className="heading-secondary currentLogFoodList__header">Foods in Current Log</h3>
      {
        props.foods === undefined || props.foods.length === 0 ? (
          <p className="heading-secondary currentLogFoodList__header">No Foods</p>
        ) : (
          <div className="currentLogFoodList__list">
            {header()}
            {createTable()}
          </div>
        )
      }
    </div>
  );
};

export default CurrentLogFoodList;