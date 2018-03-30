const foodsDefaultState = [];

export default (state = foodsDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      return [...state, action.food];
    case 'EDIT_FOOD':
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            ...action.updates,
          };
        }
        return food;
      });
    case 'REMOVE_FOOD':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_FOODS':
      return action.foods;
    default:
      return state;
  }
}