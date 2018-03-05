import firebase from 'firebase';
import _ from 'lodash';
import { EMPLOYEE_FORM_UPDATE,
  CREATE,
  EMPLOYEE_CREATED,
  EMPLOYEES_FETCH,
  EMPLOYEES_FETCH_SUCCESS
} from './types';

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
