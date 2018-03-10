import { Actions } from 'react-native-router-flux';
import {
  CLEAR_EMPLOYEE_FORM,
  EMPLOYEE_FORM_UPDATE,
  CREATE,
  UPDATE,
  DELETE,
  EMPLOYEE_CREATED,
  EMPLOYEE_UPDATED,
  EMPLOYEE_DELETED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_EMPLOYEE_FORM:
      return { ...INITIAL_STATE };
    case EMPLOYEE_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE:
    case UPDATE:
    case DELETE:
      return { ...state, loading: true };
    case EMPLOYEE_CREATED:
    case EMPLOYEE_UPDATED:
    case EMPLOYEE_DELETED:
      Actions.pop();
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
