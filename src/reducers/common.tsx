import { CommentActions } from 'semantic-ui-react';
import { GET_STRATEGIES, CLEAR_STRATEGIES, GET_EXCHANGES, CLEAR_EXCHANGES, CONNECT_EXCHANGE_SUCCESS, CONNECT_EXCHANGE_FAIL, GET_CONNECTED_EXCHANGES, GET_CONNECTED_STRATEGIES, CONNECT_STRATEGY_SUCCESS, CONNECT_STRATEGY_FAIL, GET_STRATEGY_PAIRS } from '../actions/types';

const initialState = {
  strategies: [],
  exchanges: [],
  connectedExchanges: [],
  connectedStrategies: [],
  strategyPairs: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STRATEGIES:
      return {
        ...state,
        strategies: action.payload,
      };
    case CLEAR_STRATEGIES:
      return {
        ...state,
        strategies: [],
      };
    
    case GET_EXCHANGES:
      return {
        ...state,
        exchanges: action.payload,
      };
    case CLEAR_EXCHANGES:
      return {
        ...state,
        exchanges: [],
      };
    case GET_CONNECTED_EXCHANGES:
    case CONNECT_EXCHANGE_SUCCESS:
      if (action.payload == undefined) {
        action.payload = [];
      }
      return {
        ...state,
        connectedExchanges: action.payload,
      };
    case CONNECT_EXCHANGE_FAIL:
      return {
        ...state,
        connectedExchanges: [],
      };
    case CONNECT_STRATEGY_SUCCESS:
    case GET_CONNECTED_STRATEGIES:
      return {
        ...state,
        connectedStrategies: action.payload
      }
    case CONNECT_STRATEGY_FAIL:
      return {
        ...state,
        connectedStrategies: []
      }
    case GET_STRATEGY_PAIRS:
      return {
        ...state,
        strategyPairs: action.payload
      }
    default:
      return state;
  }
}