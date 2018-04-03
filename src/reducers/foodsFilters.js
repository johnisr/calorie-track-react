
const foodsFilterReducerDefaultState = {
  name: '',
  sortBy: 'usage',
  maxFoodsShown: 10,
  offset: 0,
};

export default (state = foodsFilterReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_FOOD_NAME_FILTER': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'SORT_BY_USAGE': {
      return {
        ...state,
        sortBy: 'usage',
      };
    }
    case 'SORT_BY_DATE': {
      return {
        ...state,
        sortBy: 'date',
      };
    }
    case 'SET_MAX_FOODS_SHOWN': {
      return {
        ...state,
        maxFoodsShown: action.max,
      };
    }
    case 'SET_FOODS_OFFSET': {
      return {
        ...state,
        offset: action.offset,
      };
    }

    default:
      return state;
  }
};