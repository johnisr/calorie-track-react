export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_EDIT_LOG': {
      return action.log;
    }
    case 'REMOVE_CURRENT_EDIT_LOG': {
      return {};
    }
    case 'EDIT_CURRENT_EDIT_LOG': {
      return { 
        ...state,
        ...action.updates,
      };
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
      if (action.index < 0 || action.index >= state.foods.length) {
        return state;
      }
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
      if (action.index < 0 || action.index >= state.foods.length) {
        return state;
      }
      const newFoods = state.foods.map((food) => {
        if(food.index === action.index) {
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