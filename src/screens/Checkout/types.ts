export interface IState {
  loading: boolean;
  error: string;
  is_phone_verified: null | boolean;
  phone_number: string;
  disableSubmit: boolean;
  sentOtpSuccess: boolean;
  pk: number;
  otp: string;
}
