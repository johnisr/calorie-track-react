import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import foods from '../fixtures/foods';
import { addFood, startAddFood, editFood, removeFood, setFoods, startSetFoods } from '../../actions/foods';

const createMockStore = configureMockStore([thunk]);
const uid = 'someuidcreated456';
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const foodsData = {};
  foods.forEach(({ id, name, amount, unit, carbohydrates, protein, fat, calories }) => {
    foodsData[id] = { name, amount, unit, carbohydrates, protein, fat, calories };
  });
  database.ref(`users/${uid}/foods`).set(foodsData).then(() => done());
});


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

test('should add food to database and store', async () => {
  const store = createMockStore(defaultAuthState);
  const foodData = {
    name: 'beef',
    amount: '20',
    unit: 'grams',
    carbohydrates: '0',
    protein: '22.6',
    fat: '14.4',
    calories: '100',
  };
  await store.dispatch(startAddFood(foodData));
  
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_FOOD',
    food: {
      id: expect.any(String),
      ...foodData,
    }
  });
  const snapshot = await database.ref(`users/${uid}/foods/${actions[0].food.id}`).once('value');
  expect(snapshot.val()).toEqual(foodData);
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

test('should setup set food action object with provided values', () => {
  const action = setFoods(foods);
  expect(action).toEqual({
    type: 'SET_FOODS',
    foods,
  });
});

test('should fetch foods from firebase', async () => {
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startSetFoods())
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_FOODS',
    foods,
  });
});