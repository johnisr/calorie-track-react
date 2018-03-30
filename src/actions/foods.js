import uuid from 'uuid';

export const addFood = food => ({
  type: 'ADD_FOOD',
  food: { id: uuid(), ...food },
});