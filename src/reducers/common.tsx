import {
      IS_LOADING,
      GET_DASHBOARDDATA,
      GET_STRATEGIES, 
      CLEAR_STRATEGIES,
      GET_EXCHANGES,
      CLEAR_EXCHANGES,
      CONNECT_EXCHANGE_SUCCESS,
      CONNECT_EXCHANGE_FAIL, 
      GET_CONNECTED_EXCHANGES,
      GET_CONNECTED_STRATEGIES, 
      CONNECT_STRATEGY_SUCCESS, 
      CONNECT_STRATEGY_FAIL, 
      GET_STRATEGY_PAIRS,
      GET_ORDERS,
      REPORT_SUBMITTED
    } from '../actions/types';

const initialState = {
  dashboardData: [],
  strategies: [],
  exchanges: [],
  connectedExchanges: [],
  connectedStrategies: [],
  strategyPairs: [],
  orders: [],
  isLoading: false,
  formSubmitted: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_DASHBOARDDATA:
      return {
        ...state,
        dashboardData: [action.payload]
      }
    case GET_STRATEGIES:
      return {
        ...state,
        strategies: action.payload,
        isLoading: false
      };
    case CLEAR_STRATEGIES:
      return {
        ...state,
        strategies: [],
        isLoading: false
      };
    
    case GET_EXCHANGES:
      return {
        ...state,
        exchanges: action.payload,
        isLoading: false
      };
    case CLEAR_EXCHANGES:
      return {
        ...state,
        exchanges: [],
      };
    case GET_CONNECTED_EXCHANGES:
      if (action.payload == undefined) {
        action.payload = [];
      }
      return {
        ...state,
        connectedExchanges: action.payload,
        isLoading: false
      };
    case CONNECT_EXCHANGE_SUCCESS:
      if (action.payload == undefined) {
        action.payload = [];
      }
      return {
        ...state,
        connectedExchanges: [...state.connectedExchanges, action.payload],
        isLoading: false,
        formSubmitted: true
      };
    case CONNECT_EXCHANGE_FAIL:
      return {
        ...state,
        connectedExchanges: [],
        isLoading: false,
        formSubmitted: false
      };
    case GET_CONNECTED_STRATEGIES:
      return {
        ...state,
        connectedStrategies: action.payload,
        isLoading: false
      }
    case CONNECT_STRATEGY_SUCCESS:
      return {
        ...state,
        connectedStrategies: [...state.connectedStrategies, action.payload],
        isLoading: false,
        formSubmitted: true
      }
    case CONNECT_STRATEGY_FAIL:
      return {
        ...state,
        connectedStrategies: [],
        isLoading: false,
        formSubmitted: false
      }
    case GET_STRATEGY_PAIRS:
      return {
        ...state,
        strategyPairs: action.payload,
        isLoading: false
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case REPORT_SUBMITTED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}