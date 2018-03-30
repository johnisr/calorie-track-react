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