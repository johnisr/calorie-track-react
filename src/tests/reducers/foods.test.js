import foodsReducer from '../../reducers/foods';
import foods from '../fixtures/foods';


test('should set default state', () => {
  const state = foodsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add a food', () => {
  const action = { type: 'ADD_FOOD', food: foods[1] };
  const state = foodsReducer(undefined, action);
  expect(state).toEqual([foods[1]]);
});

test('should edit a food', () => {
  const updates = { amount: 200 };
  const action = { type: 'EDIT_FOOD', id: foods[1].id, updates };
  const state = foodsReducer(foods, action);
  expect(state[1].amount).toBe(updates.amount);
});

test('should remove a food', () => {
  const action = { type: 'REMOVE_FOOD', id: foods[1].id };
  const state = foodsReducer(foods, action);
  expect(state).toEqual([foods[0], foods[2]]);
});

test('should not remove a food if given wrong id', () => {
  const action = { type: 'REMOVE_FOOD', id: undefined };
  const state = foodsReducer(foods, action);
  expect(state).toEqual(foods);
});