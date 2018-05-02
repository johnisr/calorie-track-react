import React from 'react';

import './App.css';

import AppRouter from '../../routers/AppRouter';
import { Provider } from 'react-redux';
import { history } from '../../routers/AppRouter';

import configureStore from '../../store/configureStore';
import { firebase } from '../../firebase/firebase';

import { login, logout } from '../../actions/auth';
import { startSetFoods } from '../../actions/foods';
import { startSetLogs } from '../../actions/logs';

// import Playground from './playground/log';
// import EditFood from './playground/editFood';
// import CurrentLog from './playground/currentLog';
// import Tabs from './playground/tabs';
// import Tabs from './playground/compoundComponentTabs';
// import PlayForm from './playground/PlayForm';
// import logs from './tests/fixtures/logs';
// import { addLog } from './actions/logs';
// import Graphs from '../../playground/Graphs';
// import InfoFilter from '../../playground/InfoFilter';

const store = configureStore();

class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.dispatch(login(user.uid));
        try {
          await Promise.all([
            store.dispatch(startSetFoods()),
            store.dispatch(startSetLogs()),
          ]);
          const path = history.location.pathname;
          if (path === '/') {
            history.push('/Logs');
          }
          this.setState({ loading: false });
        } catch(e) {
    
        }
      } else {
        store.dispatch(logout());
        history.push('/');
        this.setState({ loading: false });
      }
    });
  };

  render() {
    if(this.state.loading) {
      return null;
    }

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  };
}

export default App;
