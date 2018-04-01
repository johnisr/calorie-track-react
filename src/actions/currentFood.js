export const addCurrentFood = (food) => ({
  type: 'ADD_CURRENT_FOOD',
  food,
});

export const removeCurrentFood = () => ({
  type: 'REMOVE_CURRENT_FOOD',
});
