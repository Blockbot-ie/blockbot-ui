import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  LOGOUT
  } from '../actions/types';
  
  const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
  };
  
  export default function (state = initialState, action: { type: any; payload: { access_token: string, refresh_token: string, user: object }; }) {
    const { type, payload } = action;
    switch(type) {
      case AUTHENTICATED_SUCCESS:
          return {
              ...state,
              isAuthenticated: true
          }
      case LOGIN_SUCCESS:
      case GOOGLE_AUTH_SUCCESS:
      case FACEBOOK_AUTH_SUCCESS:
          localStorage.setItem('access', payload.access_token);
          localStorage.setItem('refresh', payload.refresh_token);
          return {
              ...state,
              isAuthenticated: true,
              access: payload.access_token,
              refresh: payload.refresh_token,
              user: payload.user
          }
      case SIGNUP_SUCCESS:
          return {
              ...state,
              isAuthenticated: false
          }
      case USER_LOADED:
      case USER_LOADED_SUCCESS:
          return {
              ...state,
              user: payload
          }
      case AUTHENTICATED_FAIL:
          return {
              ...state,
              isAuthenticated: false
          }
      case USER_LOADED_FAIL:
          return {
              ...state,
              user: null
          }
      case GOOGLE_AUTH_FAIL:
      case FACEBOOK_AUTH_FAIL:
      case LOGIN_FAIL:
      case SIGNUP_FAIL:
      case LOGOUT:
          
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          return {
              ...state,
              access: null,
              refresh: null,
              isAuthenticated: false,
              user: null
          }
      case PASSWORD_RESET_SUCCESS:
      case PASSWORD_RESET_FAIL:
      case PASSWORD_RESET_CONFIRM_SUCCESS:
      case PASSWORD_RESET_CONFIRM_FAIL:
      case ACTIVATION_SUCCESS:
      case ACTIVATION_FAIL:
          return {
              ...state
          }
      default:
          return state
    }
  }