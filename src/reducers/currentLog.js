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
      if (state.foods !== undefined) {
        return {
          ...state,
          foods: [
            ...state.foods,
            {...action.food, index: state.foods.length },
          ],
        };
      } else {
        return {
          ...state,
          foods: [
            {...action.food, index: 0 },
          ],
        };
      }
    }
    case 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST': {
      if (state.foods !== undefined) {
        return {
          ...state,
          foods: [
            ...state.foods,
            {...action.food, 
              index: state.foods.length, 
              multiplier: 1,
              base: 
              {
                amount: action.food.amount,
                carbohydrates: action.food.carbohydrates,
                protein: action.food.protein,
                fat: action.food.fat,
                calories: action.food.calories,
              }
            },
          ],
        };
      } else {
        return {
          ...state,
          foods: [
            {...action.food, index: 0, multiplier: 1 , base: {...action.food} },
          ],
        };
      }
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