import React from 'react';
import { createStore } from 'redux';

import foods from '../tests/fixtures/foods';

const addCurrentEditFood = (food) => ({
  type: 'ADD_CURRENT_EDIT_FOOD',
  food,
});
const removeCurrentEditFood = () => ({
  type: 'REMOVE_CURRENT_EDIT_FOOD',
});





const reducer = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_CURRENT_EDIT_FOOD': {
      return action.food;
    }
    case 'REMOVE_CURRENT_EDIT_FOOD': {
      return {};
    }
    default: {
      return state;
    }
  }
};




const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addCurrentEditFood(foods[1]));
store.dispatch(addCurrentEditFood(foods[0]));
store.dispatch(addCurrentEditFood(foods[2]));
store.dispatch(removeCurrentEditFood());
store.dispatch(addCurrentEditFood(foods[1]));


const Playground = () => (
  <div>
    This is playground.
  </div>
)

export default Playground;
