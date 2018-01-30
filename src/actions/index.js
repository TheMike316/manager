import firebase from 'firebase';
import { EMAIL_CHANGED, PASSWORT_CHANGED } from './types.js';

export const emailChanged = (text) => (
  {
    type: EMAIL_CHANGED,
    payload: text
  }
);

export const passwordChanged = (text) => (
  {
    type: PASSWORT_CHANGED,
    payload: text
  }
);

export const loginUser = ({ email, password }) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });
    });
  };
