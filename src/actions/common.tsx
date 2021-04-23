import axios from "./axios";
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { IS_LOADING, GET_DASHBOARDDATA, GET_STRATEGIES, GET_EXCHANGES, CONNECT_EXCHANGE_FAIL, CONNECT_EXCHANGE_SUCCESS, GET_CONNECTED_EXCHANGES, GET_CONNECTED_STRATEGIES, CONNECT_STRATEGY_SUCCESS, CONNECT_STRATEGY_FAIL, GET_STRATEGY_PAIRS, GET_ORDERS, REPORT_SUBMITTED, TOPPED_UP_STRATEGY_SUCCCESS, TOPPED_UP_STRATEGY_FAIL, GET_DAILY_BALANCES } from './types';
import { Redirect } from "react-router";


// GET Strategies
export const getDashboardData = () => (dispatch, getState) => {
  axios
    .get('/api/dashboard-data', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DASHBOARDDATA,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Strategies
export const getStrategies = () => (dispatch, getState) => {
  axios
    .get('/api/strategies/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_STRATEGIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Exchanges
export const getExchanges = () => (dispatch, getState) => {
  
  axios
    .get('/api/exchanges/', tokenConfig(getState))
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
  dispatch({ type: 'IS_LOADING' });
  axios
    .post('/api/connect-exchange', body, tokenConfig(getState))
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

  dispatch({ type: 'IS_LOADING' });
  axios
    .get('/api/get-connected-exchanges', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CONNECTED_EXCHANGES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const connectStrategy = (state) => (dispatch: (arg0: { type: String; payload?: any; }) =>  void, getState: any) => {
  // Request Body
  const body = JSON.stringify(state.connectedStrategyState);

  dispatch({ type: 'IS_LOADING' });
  axios
    .post('/api/connect-strategies', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ connectExchange: 'Strategy Connected' }));
      dispatch({
        type: CONNECT_STRATEGY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CONNECT_STRATEGY_FAIL,
      });
    });
};

export const getConnectedStrategies = (state) => (dispatch: (arg0: { type: String; payload?: any }) => void, getState: any) => {

  dispatch({ type: 'IS_LOADING' });
  axios
    .get('/api/get-connected-strategies', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CONNECTED_STRATEGIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getStrategyPairs = (state) => (dispatch: (arg0: { type: String; payload?: any }) => void, getState: any) => {

  axios
    .get('/api/strategy_pairs', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_STRATEGY_PAIRS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET Orders
export const getOrders = () => (dispatch, getState) => {
  axios
    .get('/api/orders', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const submitBugReport = (state) => (dispatch: (arg0: { type: String; payload?: any; }) =>  void, getState: any) => {
  // Request Body
  const body = JSON.stringify(state.bugReportForm);

  dispatch({ type: 'IS_LOADING' });
  axios
    .post('/api/submit-bug-report', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ reportSubmitted: 'Report Submitted' }));
      dispatch({
        type: REPORT_SUBMITTED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CONNECT_STRATEGY_FAIL,
      });
    });
};

export const topUpStrategy = (state) => (dispatch: (arg0: { type: String; payload?: any; }) =>  void, getState: any) => {
  // Request Body
  const body = JSON.stringify(state.dataToSend);

  dispatch({ type: 'IS_LOADING' });
  axios
    .post('/api/top-up-strategy', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ strategyToppedUp: 'Successfully Topped Up Strategy' }));
      dispatch({
        type: TOPPED_UP_STRATEGY_SUCCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: TOPPED_UP_STRATEGY_FAIL,
      });
    });
};

export const getDailyBalances = () => (dispatch, getState) => {
  axios
    .get('/api/get-daily-balances/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DAILY_BALANCES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};