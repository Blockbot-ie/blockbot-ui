import { CREATE_MESSAGE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action: { type: any; payload: {}; }) {
  state = {}
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}