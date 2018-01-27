import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './Components/LoginForm';

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
      <Provider store={createStore(reducers)}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
