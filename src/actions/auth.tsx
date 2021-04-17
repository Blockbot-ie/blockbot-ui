import axios from "./axios";
import { returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL
  
} from './types';


export const loadUser = () => async dispatch => {
  if (localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };



      try {
          const res = await axios.get('/api/dj-rest-auth/user/', config);
          dispatch({
              type: USER_LOADED,
              payload: res.data
          });
      } catch (err) {
          dispatch({
              type: AUTH_ERROR
          });
      }
  } else {
      dispatch({
          type: AUTH_ERROR
      });
  }
};

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }; 

      const body = JSON.stringify({ token: localStorage.getItem('access') });

      try {
          const res = await axios.post('/api/dj-rest-auth/token/verify/', body, config)

          if (res.data.code !== 'token_not_valid') {
              dispatch({
                  type: AUTHENTICATED_SUCCESS
              });
          } else {
              dispatch({
                  type: AUTHENTICATED_FAIL
              });
          }
      } catch (err) {
          dispatch({
              type: AUTHENTICATED_FAIL
          });
      }

  } else {
      dispatch({
          type: AUTHENTICATED_FAIL
      });
  }
};

export const googleLogin = (accessToken) => async dispatch => {

    try {
        const res = await axios.post("/api/google/", {access_token: accessToken,});

          dispatch({
            type: GOOGLE_AUTH_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: GOOGLE_AUTH_FAIL
        });
    }
  };

export const facebookLogin = (accessToken) => async dispatch => {
    try {
        const res = await axios.post("/api/dj-rest-auth/facebook/", {access_token: accessToken,});

            dispatch({
            type: FACEBOOK_AUTH_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: FACEBOOK_AUTH_FAIL
        });
    }
}; 

export const login = (username, password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
  let email = username;

  const body = username.includes('@') ? JSON.stringify({ email, password }) : JSON.stringify({ username, password });

  try {
      const res = await axios.post(`/api/dj-rest-auth/login/ `, body, config);
      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });

      dispatch(loadUser());
  } catch (err) {
      dispatch({
          type: LOGIN_FAIL
      })
  }
};

export const signup = (first_name, last_name, email, username, password1, password2) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ first_name, last_name, email, username, password1, password2 });

  try {
      const res = await axios.post(`/api/dj-rest-auth/registration/`, body, config);

      dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: SIGNUP_FAIL
      })
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ uid, token });

  try {
      await axios.post(`/api/verify-email/'`, body, config);

      dispatch({
          type: ACTIVATION_SUCCESS,
      });
  } catch (err) {
      dispatch({
          type: ACTIVATION_FAIL
      })
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ email });

  try {
      await axios.post(`/api/password-reset/`, body, config);

      dispatch({
          type: PASSWORD_RESET_SUCCESS
      });
  } catch (err) {
      dispatch({
          type: PASSWORD_RESET_FAIL
      });
  }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
      await axios.post(`/api/password-reset-confirm/${uid}/${token}`, config);

      dispatch({
          type: PASSWORD_RESET_CONFIRM_SUCCESS
      });
  } catch (err) {
      dispatch({
          type: PASSWORD_RESET_CONFIRM_FAIL
      });
  }
};


// LOGOUT USER
export const logout = () => dispatch => {
  dispatch({
      type: LOGOUT
  });
};

// Setup config with token - helper function
export const tokenConfig = (getState: any) => {
  // Get token from state
  const token = getState().auth.access;
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};