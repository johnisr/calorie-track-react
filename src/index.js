import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { history } from './routers/AppRouter';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';

import { login, logout } from './actions/auth';
import { startSetFoods } from './actions/foods';

// import Playground from './playground/log';
// import EditFood from './playground/editFood';

const store = configureStore();

const jsx = (
<Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // try to fetch food database then render it
    store.dispatch(login(user.uid));
    try {
      await store.dispatch(startSetFoods());
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/FoodDashboard');
      }
    } catch(e) {

    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

registerServiceWorker();
