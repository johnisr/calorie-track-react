import currentFoodReducer from '../../reducers/currentFood';
import foods from '../fixtures/foods';

const currentFoodDefaultState = {
  id: '',
  name: '',
  amount: '',
  unit: '',
  carbohydrates: '',
  protein: '',
  fat: '',
  calories: '',
};

it('should set default state', () => {
  const state = currentFoodReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(currentFoodDefaultState);
});

it('should add current food', () => {
  const action = { type: 'ADD_CURRENT_FOOD', food: foods[0] };
  const state = currentFoodReducer(undefined, action);
  expect(state).toEqual(foods[0]);
});

it('should remove current food', () => {
  const action = { type: 'REMOVE_CURRENT_FOOD' };
  const state = currentFoodReducer(undefined, action);
  expect(state).toEqual(currentFoodDefaultState);
});
