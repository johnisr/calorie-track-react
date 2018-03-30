import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import countReducer from '../reducers/countReducer';
import authReducer from '../reducers/auth';
import foodsReducer from '../reducers/foods';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
 const store = createStore(
   combineReducers({
     count: countReducer,
     auth: authReducer,
     foods: foodsReducer,
   }),
   composeEnhancers(applyMiddleware(thunk))
 );

 return store;
};
