import { 
  addCurrentEditLog,
  removeCurrentEditLog,
  editCurrentEditLog,
  addFoodToCurrentLog,
  addFoodToCurrentLogFromList,
  removeFoodFromCurrentLog,
  editFoodFromCurrentLog
} from '../../actions/currentLog';
import logs from '../fixtures/logs';
import foods from '../fixtures/foods';

it('should setup add current log action object', () => {
  const action = addCurrentEditLog(logs[0]);
  expect(action).toEqual({
    type: 'ADD_CURRENT_EDIT_LOG',
    log: logs[0],
  });
});

it('should setup remove current log action object', () => {
  const action = removeCurrentEditLog();
  expect(action).toEqual({
    type: 'REMOVE_CURRENT_EDIT_LOG',
  });
});

it('should setup edit current log action object', () => {
  const updates = { date: 0, };
  const action = editCurrentEditLog(updates);
  expect(action).toEqual({
    type: 'EDIT_CURRENT_EDIT_LOG',
    updates,
  });
});

it('should setup add food to current log action object', () => {
  const action = addFoodToCurrentLog(foods[1]);
  expect(action).toEqual({
    type: 'ADD_FOOD_TO_CURRENT_LOG',
    food: foods[1],
  });
});

it('should setup add food to current log from list action object', () => {
  const action = addFoodToCurrentLogFromList(foods[2]);
  expect(action).toEqual({
    type: 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST',
    food: foods[2],
  });
});

it('should setup remove food from current log action object', () => {
  const action = removeFoodFromCurrentLog(1);
  expect(action).toEqual({
    type: 'REMOVE_FOOD_FROM_CURRENT_LOG',
    index: 1,
  });
});

it('should setup edit food from current log action object', () => {
  const updates = { name: 'burger' };
  const action = editFoodFromCurrentLog(2, updates);
  expect(action).toEqual({
    type: 'EDIT_FOOD_FROM_CURRENT_LOG',
    index: 2,
    updates,
  });
});