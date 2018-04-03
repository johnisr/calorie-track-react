export const setFoodNameFilter = (name = '') => ({
  type: 'SET_FOOD_NAME_FILTER',
  name,
});

export const sortByUsage = () => ({
  type: 'SORT_BY_USAGE',
});

export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

export const setMaxFoodsShown = (max = 10) => ({
  type: 'SET_MAX_FOODS_SHOWN',
  max,
});

export const setFoodsOffset = (offset = 0) => ({
  type: 'SET_FOODS_OFFSET',
  offset,
});
