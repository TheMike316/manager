import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_FORM_UPDATE,
  CREATE,
  EMPLOYEE_CREATED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE:
      return { ...state, loading: true };
    case EMPLOYEE_CREATED:
      Actions.pop();
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
