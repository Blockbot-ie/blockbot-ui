import { GET_STRATEGIES, CLEAR_STRATEGIES, GET_EXCHANGES, CLEAR_EXCHANGES, CONNECT_EXCHANGE_SUCCESS } from '../actions/types';

const initialState = {
  strategies: [],
  exchanges: [],
  connectedExchange: []
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
    case CONNECT_EXCHANGE_SUCCESS:
      return {
        ...state,
        connectedExchange: [...state.connectedExchange, action.payload],
      };
    default:
      return state;
  }
}