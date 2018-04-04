import currentLogReducer from '../../reducers/currentLog';
import logs from '../fixtures/logs';
import foods from '../fixtures/foods';

const emptyState = {
  date: 0,
  weight: '',
  unit: '',
  foods: [],
};

it('should set default state', () => {
  const state = currentLogReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

it('should add a log', () => {
  const action = { type: 'ADD_CURRENT_EDIT_LOG', log: logs[0] };
  const state = currentLogReducer(undefined, action);
  expect(state).toEqual(logs[0]);
});

it('should remove a log', () => {
  const action = { type: 'REMOVE_CURRENT_EDIT_LOG' };
  const state = currentLogReducer(logs[0], action);
  expect(state).toEqual({});
});

it('should edit a log', () => {
  const updates = { weight: 100, unit: 'kg' };
  const action = { type: 'EDIT_CURRENT_EDIT_LOG', updates };
  const state = currentLogReducer(logs[0], action);
  expect(state).toEqual({
    ...logs[0],
    ...updates,
  });
});

it('should add food to food log with index', () => {
  const action = { type: 'ADD_FOOD_TO_CURRENT_LOG', food: foods[0] };
  const state = currentLogReducer(emptyState, action);
  expect(state.foods).toEqual([{ ...foods[0], index: 0 }]);
});

it('should add food to food log with index and multiplier', () => {
  const action = { type: 'ADD_FOOD_TO_CURRENT_LOG_FROM_LIST', food: foods[0] };
  const state = currentLogReducer(emptyState, action);
  expect(state.foods).toEqual([{ ...foods[0], index: 0, multiplier: 1, base: {...foods[0] } }]);
});


describe('remove / edit food from food log', () => {
  let prevState;
  // add index to each food in the foods list of a log with foods[0], foods[1], foods[2]
  beforeEach(() => {
    const newFoods = [];
    logs[2].foods.forEach((food, index) => {
      newFoods.push({
        ...food,
        index,
      });
    });
    const newLog = {
      ...logs[2],
      foods: newFoods,
    }
    prevState = currentLogReducer(newLog, { type: '@@INIT' });
  });

  it('should remove middle food from food log using index and update food indexes', () => {
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: 1 };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(2);
    expect(state.foods).toEqual([prevState.foods[0], prevState.foods[2]]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
  });

  it('should remove top food from food log using index and update food indexes', () => {
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: 0 };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(2);
    expect(state.foods).toEqual([prevState.foods[1], prevState.foods[2]]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
  });

  it('should remove bottom food from food log using index and update food indexes', () => {
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: 2 };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(2);
    expect(state.foods).toEqual([prevState.foods[0], prevState.foods[1]]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
  });

  it('should not remove food from food log if wrong index', () => {
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: -1 };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual(prevState.foods);
  });

  it('should not remove food from food log if wrong index', () => {
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: 3 };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual(prevState.foods);
  });
  
  it('should remove only food from food log if using index 0', () => {
    const addAction = { type: 'ADD_FOOD_TO_CURRENT_LOG', food: foods[0] };
    const oneFoodState = currentLogReducer(emptyState, addAction)
    expect(oneFoodState.foods).toEqual([{ ...foods[0], index: 0 }]);
    
    const action = { type: 'REMOVE_FOOD_FROM_CURRENT_LOG', index: 0 };
    const state = currentLogReducer(oneFoodState, action);
    expect(state.foods.length).toBe(0);
  });

  it('should edit middle food from food log using index and not change food indexes', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 1, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual([
      prevState.foods[0], 
      { ...prevState.foods[1], ...updates },
      prevState.foods[2]
    ]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
    expect(state.foods[2].index).toBe(2);
  });
  
  it('should edit top food from food log using index and not change food indexes', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 0, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual([
      { ...prevState.foods[0], ...updates },
      prevState.foods[1], 
      prevState.foods[2],
    ]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
    expect(state.foods[2].index).toBe(2);
  });

  it('should edit top food from food log using index and not change food indexes', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 0, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual([
      { ...prevState.foods[0], ...updates },
      prevState.foods[1], 
      prevState.foods[2],
    ]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
    expect(state.foods[2].index).toBe(2);
  });

  it('should edit bottom food from food log using index and not change food indexes', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 2, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual([
      prevState.foods[0], 
      prevState.foods[1],
      { ...prevState.foods[2], ...updates },
    ]);
    expect(state.foods[0].index).toBe(0);
    expect(state.foods[1].index).toBe(1);
    expect(state.foods[2].index).toBe(2);
  });

  it('should not edit food log using invalid index', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: -1, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual(prevState.foods);
  });

  it('should not edit food log using invalid index', () => {
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 3, updates };
    const state = currentLogReducer(prevState, action);
    expect(state.foods.length).toBe(3);
    expect(state.foods).toEqual(prevState.foods);
  });

  it('should edit only food from food log if using index 0', () => {
    const addAction = { type: 'ADD_FOOD_TO_CURRENT_LOG', food: foods[0] };
    const oneFoodState = currentLogReducer(emptyState, addAction)
    expect(oneFoodState.foods).toEqual([{ ...foods[0], index: 0 }]);
    
    const updates = { name: 'Ribs', calories: '300'};
    const action = { type: 'EDIT_FOOD_FROM_CURRENT_LOG', index: 0, updates };
    const state = currentLogReducer(oneFoodState, action);
    expect(state.foods.length).toBe(1);
    expect(state.foods).toEqual([
      { ...oneFoodState.foods[0], ...updates },
    ]);
    expect(state.foods[0].index).toBe(0);
  });
  
});