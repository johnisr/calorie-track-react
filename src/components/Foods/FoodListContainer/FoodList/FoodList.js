import React from 'react';
import './FoodList.css';

const FoodList = (props) => {
  
  const listHeader = () => (
    <div className="foodListDisplayFoods__list-header">
      <p className="foodListDisplayFoods__list-title">name</p>
      <p className="foodListDisplayFoods__list-title">amount</p>
      <p className="foodListDisplayFoods__list-title">carbs</p>
      <p className="foodListDisplayFoods__list-title">protein</p>
      <p className="foodListDisplayFoods__list-title">fat</p>
      <p className="foodListDisplayFoods__list-title">calories</p>
    </div>
  );

  const createTable = () => (
    props.foods.map((food, index) => (
      <div 
        key={`div ${food.id}`}
        className={index % 2 === 0 ? 
          "foodListDisplayFoods__list-table" : 
          "foodListDisplayFoods__list-table foodListDisplayFoods__list-table--even"}
      >
        {listItem(food)}
        {listOption(food)}
      </div>
    ))
  );

  const listItem = (food) => (
    <div className="foodListDisplayFoods__item">
      <p className="foodListDisplayFoods__item-text">{food.name}</p>
      <p className="foodListDisplayFoods__item-text">{food.amount} {food.unit}</p>
      <p className="foodListDisplayFoods__item-text">{food.carbohydrates}</p>
      <p className="foodListDisplayFoods__item-text">{food.protein}</p>
      <p className="foodListDisplayFoods__item-text">{food.fat}</p>
      <p className="foodListDisplayFoods__item-text">{food.calories}</p>
    </div>
  );

  const listOption = (food) => (
    <button
      className="btn foodListDisplayFoods__list-btn flex-right-end"
      key={`button ${food.id}`} 
      onClick={() => props.onClick(food)}
    >
      {props.buttonText}
    </button>
  );

  return (
    <div className="foodListDisplayFoods">
      <h3 className="heading-secondary foodListDisplayFoods__header">Foods in Database</h3>
      {
        props.foods.length === 0 ? (
          <p className="heading-secondary foodListDisplayFoods__header">No Foods</p>
        ) : (
        <div className="foodListDisplayFoods__list">
          {listHeader()}
          {createTable()}
        </div>
        )
      }
    </div>
  );
}


export default FoodList;