import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_STRATEGIES } from './types';

// GET LEADS
export const getStrategies = () => (dispatch, getState) => {
  axios
    .get('http://localhost:8000/api/strategies/', tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch({
        type: GET_STRATEGIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};