import { GET_STRATEGIES, CLEAR_STRATEGIES, GET_EXCHANGES, CLEAR_EXCHANGES, CONNECT_EXCHANGE_SUCCESS, CONNECT_EXCHANGE_FAIL, GET_CONNECTED_EXCHANGES } from '../actions/types';

const initialState = {
  strategies: [],
  exchanges: [],
  connectedExchanges: []
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
    default:
      return state;
  }
}