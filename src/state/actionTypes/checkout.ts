export enum CheckoutActionTypes {
  CREACT_NEW_ORDER_START = 'CREACT_NEW_ORDER_START',
  CREACT_NEW_ORDER_SUCCESS = 'CREACT_NEW_ORDER_SUCCESS',
  CREACT_NEW_ORDER_FAILD = 'CREACT_NEW_ORDER_FAILD',

  CHECK_PHONE_VALID_NOT_START = 'CHECK_PHONE_VALID_NOT_START',
  CHECK_PHONE_VALID_NOT_SUCCESS = 'CHECK_PHONE_VALID_NOT_SUCCESS',
  CHECK_PHONE_VALID_NOT_FAILD = 'CHECK_PHONE_VALID_NOT_FAILD',

  CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_START = 'CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_START',
  CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_SUCCESS = 'CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_SUCCESS',
  CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_FAILD = 'CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_FAILD',

  CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_START = 'CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_START',
  CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_SUCCESS = 'CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_SUCCESS',
  CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_FAILD = 'CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_FAILD',

  CHANGE_TO_DEFAULT_STATE = 'CHANGE_TO_DEFAULT_STATE',
}
