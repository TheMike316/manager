import { EMAIL_CHANGED } from './types.js';

export const emailChanged = (text) => (
  {
    type: EMAIL_CHANGED,
    payload: text
  }
);
