import uuid from 'uuid';

export const addFood = food => ({
  type: 'ADD_FOOD',
  food: { id: uuid(), ...food },
});

export const editFood = (id, updates) => ({
  type: 'EDIT_FOOD',
  id,
  updates,
});

export const removeFood = ({ id }) => ({
  type: 'REMOVE_FOOD',
  id,
});