import { EMAIL_CHANGED, PASSWORT_CHANGED } from '../actions/types.js';

const INITIAL_STATE = {
  email: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORT_CHANGED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
