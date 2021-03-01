import { CREATE_MESSAGE, GET_ERRORS } from './types';

export const createMessage = (msg: String) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg: String, status: any) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};