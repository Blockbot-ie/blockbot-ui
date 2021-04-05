import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  modalOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalOpen: true
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}