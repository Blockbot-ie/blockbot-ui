import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_STRATEGIES, GET_EXCHANGES, CONNECT_EXCHANGE_FAIL, CONNECT_EXCHANGE_SUCCESS, GET_CONNECTED_EXCHANGES } from './types';

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

// Connect Exchange
export const connectExchange = (state) => (dispatch: (arg0: { type: String; payload?: any; }) =>  void, getState: any) => {
    // Headers
  
  const token = getState().auth.token
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
  };

  // Request Body
  const body = JSON.stringify(state.connectedExchangeState);
  axios
    .post('http://localhost:8000/api/connect-exchange', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ connectExchange: 'Exchange Connected' }));
      dispatch({
        type: CONNECT_EXCHANGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CONNECT_EXCHANGE_FAIL,
      });
    });
};

export const getConnectedExchanges = (state) => (dispatch: (arg0: { type: String; payload?: any }) => void, getState: any) => {

  const token = getState().auth.tokenConfigcons

  axios
    .get('http://localhost:8000/api/connect-exchange', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CONNECTED_EXCHANGES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}