const foodsDefaultState = [];

export default (state = foodsDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      return [...state, action.food];
    default:
      return state;
  }
}