import firebase from 'firebase';
import { EMPLOYEE_FORM_UPDATE, CREATE, EMPLOYEE_CREATED } from './types';

export const employeeFormUpdate = ({ prop, value }) => ({
    type: EMPLOYEE_FORM_UPDATE,
    payload: { prop, value }
  });

export const employeeCreate = ({ name, phone, shift }) => (dispatch) => {
  const { currentUser } = firebase.auth();

  dispatch({ type: CREATE });

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(dispatch({ type: EMPLOYEE_CREATED }));
};
