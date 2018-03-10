import firebase from 'firebase';
import _ from 'lodash';
import {
  CLEAR_EMPLOYEE_FORM,
  EMPLOYEE_FORM_UPDATE,
  CREATE,
  UPDATE,
  DELETE,
  EMPLOYEE_CREATED,
  EMPLOYEE_UPDATED,
  EMPLOYEE_DELETED,
  EMPLOYEES_FETCH,
  EMPLOYEES_FETCH_SUCCESS
} from './types';

export const clearEmployeeForm = () => ({
  type: CLEAR_EMPLOYEE_FORM
});

export const employeeFormUpdate = ({ prop, value }) => ({
    type: EMPLOYEE_FORM_UPDATE,
    payload: { prop, value }
  });

export const employeeCreate = ({ name, phone, shift }) => (dispatch) => {
  dispatch({ type: CREATE });

  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(dispatch({ type: EMPLOYEE_CREATED }));
};

export const employeeUpdate = ({ name, phone, shift, uid }) => (dispatch) => {
  dispatch({ type: UPDATE });

  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then(dispatch({ type: EMPLOYEE_UPDATED }));
};

export const employeeDelete = ({ uid }) => (dispatch) => {
  dispatch({ type: DELETE });

  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(dispatch({ type: EMPLOYEE_DELETED }));
};

export const employeesFetch = () => (dispatch) => {
  dispatch({ type: EMPLOYEES_FETCH });

  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .on('value', snapshot => {
      dispatch({
        type: EMPLOYEES_FETCH_SUCCESS,
        payload: convertEmployeesObject(snapshot.val())
      });
    });
};

const convertEmployeesObject = (employees) => (
  _.map(employees, (val, uid) => ({ ...val, uid }))
);
