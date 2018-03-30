import foods from '../fixtures/foods';
import { addFood, editFood, removeFood } from '../../actions/foods';

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

it('should setup editFood action object with provided values', () => {
  const id = 55;
  const updates = { name: 'anotherName', amount: 50};
  const action = editFood(id, updates);
  expect(action).toEqual({
    type: 'EDIT_FOOD',
    id,
    updates,
  });
});

test('should setup removeFood action object with provided values', () => {
  const action = removeFood(foods[1]);
  expect(action).toEqual({
    type: 'REMOVE_FOOD',
    id: foods[1].id,
  });
});