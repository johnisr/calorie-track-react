const currentFoodDefaultState = {
  id: '',
  name: '',
  amount: '',
  unit: '',
  carbohydrates: '',
  protein: '',
  fat: '',
  calories: '',
}

export default (state = currentFoodDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_FOOD': {
      return action.food;
    }
    case 'REMOVE_CURRENT_FOOD': {
      return currentFoodDefaultState;
    }
    default: {
      return state;
    }
  }
};