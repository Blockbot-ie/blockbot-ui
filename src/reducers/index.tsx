import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import common from './common';

export default combineReducers({
  errors,
  messages,
  auth,
  common
});