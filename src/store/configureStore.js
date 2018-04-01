import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import foodsReducer from '../reducers/foods';
import currentFoodReducer from '../reducers/currentFood';
import logsReducer from '../reducers/logs';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     auth: authReducer,
     foods: foodsReducer,
     currentFood: currentFoodReducer,
     logs: logsReducer,
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};
