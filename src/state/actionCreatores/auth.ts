import axios from 'axios';
import {Dispatch} from 'redux';
import {AuthActionTypes} from '../actionTypes/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type validateOtpProps = {
  pk: string;
  otp: number;
};
export const authStart = () => {
  return {
    type: AuthActionTypes.AUTH_START,
  };
};

export const otpSent = (res: {data: {pk: string}; status: number}) => {
  return {
    type: AuthActionTypes.OTP_SENT,
    status: res.status,
    pk: res.data.pk,
    data: res.data,
  };
};

export const authSuccess = (data: any, token: string | null) => {
  console.log('validateStatus111', data);
  return {
    type: AuthActionTypes.AUTH_SUCCESS,
    token: token,
    validateStatus: data.status,
  };
};

export const authFail = (error: any) => {
  return {
    type: AuthActionTypes.AUTH_FAIL,
    error: 'Something went wrong',
  };
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  return {
    type: AuthActionTypes.AUTH_LOGOUT,
  };
};

export const sendOtp = ({phone_number}: any) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    axios
      .post(`auth/generate/`, {
        phone_number,
      })
      .then(res => {
        dispatch(otpSent(res));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const validateOtp = ({otp, pk}: validateOtpProps) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    axios
      .post(`auth/validate/`, {
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
