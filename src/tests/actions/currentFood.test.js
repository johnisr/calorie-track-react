import foods from '../fixtures/foods';
import { addCurrentFood, removeCurrentFood } from '../../actions/currentFood';

it('should setup add current food with provided values', () => {
  const action = addCurrentFood(foods[1]);
  expect(action).toEqual({
    type: 'ADD_CURRENT_FOOD',
    food: foods[1],
  });
});

it('should setup remove current food', () => {
  const action = removeCurrentFood();
  expect(action).toEqual({
    type: 'REMOVE_CURRENT_FOOD',
  });
});