import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { history } from './routers/AppRouter';

import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';

import { login, logout } from './actions/auth';
import { startSetFoods } from './actions/foods';

// import Playground from './playground/log';
// import EditFood from './playground/editFood';
import logs from './tests/fixtures/logs';
import { addLog } from './actions/logs';

const store = configureStore();

store.dispatch(addLog(logs[0]));
store.dispatch(addLog(logs[1]));
store.dispatch(addLog(logs[2]));

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
    store.dispatch(login(user.uid));
    try {
      await store.dispatch(startSetFoods());
      renderApp();
      const path = history.location.pathname;
      if (path === '/') {
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
