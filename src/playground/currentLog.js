import React from 'react';
import { createStore } from 'redux';

import logs from '../tests/fixtures/logs';
import foods from '../tests/fixtures/foods';

const addCurrentEditLog = (log) => ({
  type: 'ADD_CURRENT_EDIT_LOG',
  log,
});

const removeCurrentEditLog = () => ({
  type: 'REMOVE_CURRENT_EDIT_LOG',
});

const addFoodToCurrentLog = (food) => ({
  type: 'ADD_FOOD_TO_CURRENT_LOG',
  food,
});

const addFoodToCurrentLogFromList = (food) => ({
  type: 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST',
  food,
});

const removeFoodFromCurrentLog = (index) => ({
  type: 'REMOVE_FOOD_FROM_CURRENT_LOG',
  index,
});

const editFoodFromCurrentLog = (index, updates) => ({
  type: 'EDIT_FOOD_FROM_CURRENT_LOG',
  index,
  updates,
});


const currentLogReducer = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_CURRENT_EDIT_LOG': {
      return action.log;
    }
    case 'REMOVE_CURRENT_EDIT_LOG': {
      return {};
    }
    case 'ADD_FOOD_TO_CURRENT_LOG': {
      return {
        ...state,
        foods: [
          ...state.foods,
          {...action.food, index: state.foods.length },
        ],
      };
    }
    case 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST': {
      return {
        ...state,
        foods: [
          ...state.foods,
          {...action.food, index: state.foods.length, multiplier: 1 },
        ],
      };
    }
    case 'REMOVE_FOOD_FROM_CURRENT_LOG': {
      const newFoods = 
        state.foods.slice(0, action.index)
          .concat(state.foods.slice(action.index + 1));
      for (let i = action.index; i < newFoods.length; i++) {
        newFoods[i].index = i;
      }
      return {
        ...state,
        foods: newFoods,
      }
    }
    case 'EDIT_FOOD_FROM_CURRENT_LOG': {
      const newFoods = state.foods.map((food) => {
        if(food.index === action.index) {
          console.log({...food});
          const newFood = {
            ...food,
            ...action.updates,
          };
          return newFood;
        }
        return food;
      });
      return {
        ...state,
        foods: newFoods,
      }
    }
    default: {
      return state;
    }
  }
};

const store = createStore(currentLogReducer);

store.subscribe(() => {
  // console.log(store.getState());
  const foodArray = store.getState().foods;
  if(foodArray) {
    console.log(foodArray);
  }
  if(foodArray) {
    for (let i = 0; i < foodArray.length; i++) {
      if (foodArray[i].index !== i) {
        console.log(`FALSE at ${i}`);
      }
    }
  }
});

const defaultLog = {
  date: 0,
  weight: '',
  unit: '',
  foods: [],
};

store.dispatch(addCurrentEditLog(logs[1]));
store.dispatch(removeCurrentEditLog());
store.dispatch(addCurrentEditLog(defaultLog));

store.dispatch(addFoodToCurrentLog(foods[0]));
store.dispatch(addFoodToCurrentLogFromList(foods[1]));
store.dispatch(addFoodToCurrentLog(foods[2]));
store.dispatch(addFoodToCurrentLog(foods[0]));
store.dispatch(addFoodToCurrentLogFromList(foods[1]));
store.dispatch(addFoodToCurrentLog(foods[2]));
store.dispatch(addFoodToCurrentLogFromList(foods[0]));
store.dispatch(addFoodToCurrentLog(foods[1]));
store.dispatch(addFoodToCurrentLog(foods[2]));


console.log('EDIT MIDDLE, see if right');
console.log('-----------------------');
store.dispatch(editFoodFromCurrentLog(2, { name: 'BETTER JASMINE RICE' }));
store.dispatch(removeFoodFromCurrentLog(2));

console.log('EDIT TOP, see if right');
console.log('-----------------------');
// // Edit and remove from top, see if index are
store.dispatch(editFoodFromCurrentLog(0, { name: 'BEST JASMINE RICE' }));
store.dispatch(removeFoodFromCurrentLog(0));

console.log('EDIT BOTTOM, see if right');
console.log('-----------------------');
store.dispatch(editFoodFromCurrentLog(6, { name: 'BEST JASMINE RICE' }));
store.dispatch(removeFoodFromCurrentLog(6));

store.dispatch(editFoodFromCurrentLog(3, { name: 'BEST JASMINE RICE' }));
store.dispatch(removeFoodFromCurrentLog(3));

const CurrentLog = () => (
  <div>
    This is Playground!
  </div>
);

export default CurrentLog;