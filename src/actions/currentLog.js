export const addCurrentEditLog = (log) => ({
  type: 'ADD_CURRENT_EDIT_LOG',
  log,
});

export const removeCurrentEditLog = () => ({
  type: 'REMOVE_CURRENT_EDIT_LOG',
});

export const editCurrentEditLog = (updates) => ({
  type: 'EDIT_CURRENT_EDIT_LOG',
  updates,
});

export const addFoodToCurrentLog = (food) => ({
  type: 'ADD_FOOD_TO_CURRENT_LOG',
  food,
});

export const addFoodToCurrentLogFromList = (food) => ({
  type: 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST',
  food,
});

export const removeFoodFromCurrentLog = (index) => ({
  type: 'REMOVE_FOOD_FROM_CURRENT_LOG',
  index,
});

export const editFoodFromCurrentLog = (index, updates) => ({
  type: 'EDIT_FOOD_FROM_CURRENT_LOG',
  index,
  updates,
});