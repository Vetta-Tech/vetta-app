import {configureStore} from '@reduxjs/toolkit';

import * as actionTypes from '../types';

import {updateObject} from './utils';

export interface AuthStateTypes {
  loading: boolean;
  error: string;
  token: null;
  data: object;
  status: number;
  pk: number;
  validateStatus: number;
}

const initialState: AuthStateTypes = {
  loading: false,
  error: '',
  token: null,
  status: 0,
  pk: 0,
  data: {},
  validateStatus: 0,
};

const authStart = (state: AuthStateTypes, action: any) => {
  return updateObject(state, {
    error: '',
    loading: true,
  });
};

const otpSent = (state: AuthStateTypes, action: any) => {
  return updateObject(state, {
    data: action.data,
    loading: false,
    pk: action.pk,
    status: action.status,
  });
};

const authSuccess = (state: AuthStateTypes, action: any) => {
  return updateObject(state, {
    token: action.token,
    error: '',
    loading: false,
    validateStatus: action.validateStatus,
  });
};

const authFail = (state: AuthStateTypes, action: any) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: AuthStateTypes, action: any) => {
  return updateObject(state, {
    token: null,
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.OTP_SENT:
      return otpSent(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
