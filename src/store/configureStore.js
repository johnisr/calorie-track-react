import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import foodsReducer from '../reducers/foods';
import currentFoodReducer from '../reducers/currentFood';
import logsReducer from '../reducers/logs';
import currentLogReducer from '../reducers/currentLog';
import foodsFiltersReducer from '../reducers/foodsFilters';
import logsFiltersReducer from '../reducers/logsFilters';
import infoFiltersReducer from '../reducers/infoFilters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     auth: authReducer,
     foods: foodsReducer,
     foodsFilters: foodsFiltersReducer,
     currentFood: currentFoodReducer,
     logs: logsReducer,
     logsFilters: logsFiltersReducer,
     currentLog: currentLogReducer,
     infoFilters: infoFiltersReducer,
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};
