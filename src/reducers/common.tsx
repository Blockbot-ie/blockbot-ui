import { GET_STRATEGIES, CLEAR_STRATEGIES, GET_EXCHANGES, CLEAR_EXCHANGES } from '../actions/types';

const initialState = {
  strategies: [],
  exchanges: []
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
    default:
      return state;
  }
}