import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORT_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types.js';

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
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      console.log(error);
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    });
  };

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
