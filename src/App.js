import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router.js';

class App extends Component {
  componentWillMount() {
      const config = {
      apiKey: 'AIzaSyBUCDQewZRlyz4mm5HqR3b4Adeyg1MLwI0',
      authDomain: 'manager-bb334.firebaseapp.com',
      databaseURL: 'https://manager-bb334.firebaseio.com',
      projectId: 'manager-bb334',
      storageBucket: 'manager-bb334.appspot.com',
      messagingSenderId: '646987934145'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}

export default App;
