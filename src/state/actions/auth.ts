import {AuthActionTypes} from '../actionTypes/auth';

interface AuthStart {
  type: AuthActionTypes.AUTH_START;
}

interface OtpSent {
  type: AuthActionTypes.OTP_SENT;
  status: number;
  pk: number;
  data: any;
}

interface AuthSuccess {
  type: AuthActionTypes.AUTH_SUCCESS;
  validateStatus: number;
  token: string;
}

interface AuthFail {
  type: AuthActionTypes.AUTH_FAIL;
  payload: string;
}

export type AuthAction = AuthStart | OtpSent | AuthSuccess | AuthFail;
