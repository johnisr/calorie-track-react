import React from 'react';
import FoodListItem from './FoodListItem';

const FoodList = (props) => (
  <div>
    {
      props.foods.length === 0 ? (
        <p>No Foods</p>
      ) : (
        props.foods.map(food => (
          <div key={`div ${food.id}`}>
            <FoodListItem 
              key={`item ${food.id}`}
              {...food}
            />
            <button 
              key={`button ${food.id}`} 
              onClick={() => props.handleClick(food)}
            >
              {props.buttonText}
            </button>
          </div>
        ))
      )
    }
  </div>
);

export default FoodList;
