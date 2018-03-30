import foods from '../fixtures/foods';
import { addFood } from '../../actions/foods';

it('should setup addFood action object with provided values', () => {
  const action = addFood(foods[1]);
  expect(action).toEqual({
    type: 'ADD_FOOD',
    food: {
      id: expect.any(String),
      ...foods[1],
    },
  });
});