import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../types';
import {API_URL} from '@env';

import {AppDispatch} from '../reducers/';

type validateOtpProps = {
  pk: string;
  otp: number;
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const otpSent = (res: {data: {pk: string}; status: number}) => {
  return {
    type: actionTypes.OTP_SENT,
    status: res.status,
    pk: res.data.pk,
    data: res.data,
  };
};

export const authSuccess = (data: any, token: string | null) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    validateStatus: data.status,
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: 'Something went wrong',
  };
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const sendOtp = ({phone_number}: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(authStart());

    axios
      .post(`${API_URL}auth/generate/`, {
        phone_number,
      })
      .then(res => {
        console.log('asd');
        dispatch(otpSent(res));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const validateOtp = ({otp, pk}: validateOtpProps) => {
  return (dispatch: AppDispatch) => {
    dispatch(authStart());
    axios
      .post(`${API_URL}auth/validate/`, {
        otp,
        pk,
      })
      .then(async res => {
        const token = res.data.token;
        dispatch(authSuccess(res, token));
        await AsyncStorage.setItem('token', token);
      })
      .catch(err => dispatch(authFail(err)));
  };
};

export const authCheckState = () => {
  return async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess('', token));
    }
  };
};
