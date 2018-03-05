import {
  EMPLOYEES_FETCH,
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  employees: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH:
      return { ...state, loading: true };
    case EMPLOYEES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload
      };
    default:
      return state;

  }
};
