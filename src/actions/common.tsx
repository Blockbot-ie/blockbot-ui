import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_STRATEGIES, GET_EXCHANGES } from './types';

// GET LEADS
export const getStrategies = () => (dispatch, getState) => {
  axios
    .get('http://localhost:8000/api/strategies/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_STRATEGIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET LEADS
export const getExchanges = () => (dispatch, getState) => {
  axios
    .get('http://localhost:8000/api/exchanges/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_EXCHANGES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};