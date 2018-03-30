import uuid from 'uuid';
import database from '../firebase/firebase';

export const addFood = food => ({
  type: 'ADD_FOOD',
  food: { id: uuid(), ...food },
});

export const startAddFood = (data = {}) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      name = '',
      amount = '0',
      unit = 'grams',
      carbohydrates = 0,
      protein = 0,
      fat = 0,
      calories = 0,
    } = data;
    const food = { name, amount, unit, carbohydrates, protein, fat, calories };
    try {
      const res = await database.ref(`users/${uid}/foods`).push(food);
      dispatch(addFood({ id: res.key, ...food }));
    } catch (e) {

    }
  };
}

export const editFood = (id, updates) => ({
  type: 'EDIT_FOOD',
  id,
  updates,
});

export const removeFood = ({ id }) => ({
  type: 'REMOVE_FOOD',
  id,
});