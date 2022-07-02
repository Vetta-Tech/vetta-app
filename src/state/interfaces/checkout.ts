export interface CheckouState {
  loading: boolean;
  error: string;
  is_phone_verified: null | boolean;
  phone_number: string;
  disableSubmit: boolean;
  sentOtpSuccess: boolean;
  pk: number;
  otp: string;
  userAddress: string;
  showPlacholderTopText: boolean;
  textLength: number;
  specialInstruction: string;
  payment_method: 'cash' | 'card' | 'bkash';
  order_create_success: boolean;
  order_create_error: string;
  GatewayPageURL: string;
  moadlShow: boolean;
}
