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
  const getTotal = () => {
    const { foods } = props;
    let total = { protein: 0, carbohydrates: 0, fat: 0, calories: 0 };
    if (foods) {
      total = foods.reduce((prev, curr) => ({
        protein: prev.protein + curr.protein,
        carbohydrates: prev.carbohydrates + curr.carbohydrates,
        fat: prev.fat + curr.fat,
        calories: prev.calories + curr.calories,
      }), total);
    };
    return {
      protein: (total.protein).toFixed(2),
      carbohydrates:  (total.carbohydrates).toFixed(2),
      fat: (total.fat).toFixed(2),
      calories: (total.calories).toFixed(2),
    };
  }

  const listTotal = () => {
    const { carbohydrates, protein, fat, calories } = getTotal();
    console.log(carbohydrates, protein, fat, calories);
    return (
      <div className="currentLogFoodList__item">
        <p className="currentLogFoodList__item-text">{'TOTAL'}</p>
        <p className="currentLogFoodList__item-text">{''}</p>
        <p className="currentLogFoodList__item-text">{carbohydrates}</p>
        <p className="currentLogFoodList__item-text">{protein}</p>
        <p className="currentLogFoodList__item-text">{fat}</p>
        <p className="currentLogFoodList__item-text">{calories}</p>
      </div>
    );
}

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
            {listTotal()}
          </div>
        )
      }
    </div>
  );
};

export default CurrentLogFoodList;