import {CheckoutActionTypes} from '../actionTypes/checkout';

interface CreateOrderStart {
  type: CheckoutActionTypes.CREACT_NEW_ORDER_START;
}

interface CreateOrderSuccess {
  type: CheckoutActionTypes.CREACT_NEW_ORDER_SUCCESS;
}

interface CreateOrderFaild {
  type: CheckoutActionTypes.CREACT_NEW_ORDER_FAILD;
  error: string;
}

interface CheckPhoneValidOrNotStart {
  type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_START;
}

interface CheckPhoneValidOrNotSucess {
  type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_SUCCESS;
  is_phone_verified: boolean;
}

interface CheckPhoneValidOrNotFaild {
  type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_FAILD;
  error: string;
}

interface CheckoutPhoneVerificationSendOtpStart {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_START;
}

interface CheckoutPhoneVerificationSendOtpSuccess {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_SUCCESS;
  pk: number;
}

interface CheckoutPhoneVerificationSendOtpFaild {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_FAILD;
  error: string;
}

interface CheckoutPhoneVerificationVailidateOtpStart {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_START;
}

interface CheckoutPhoneVerificationVailidateOtpSuccess {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_SUCCESS;
}

interface CheckoutPhoneVerificationVailidateOtpFaild {
  type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_FAILD;
  error: string;
}

interface ChangeStateToDefault {
  type: CheckoutActionTypes.CHANGE_TO_DEFAULT_STATE;
}

export type CheckoutAction =
  | CreateOrderStart
  | CreateOrderSuccess
  | CreateOrderFaild
  | CheckPhoneValidOrNotStart
  | CheckPhoneValidOrNotSucess
  | CheckPhoneValidOrNotFaild
  | CheckoutPhoneVerificationSendOtpStart
  | CheckoutPhoneVerificationSendOtpSuccess
  | CheckoutPhoneVerificationSendOtpFaild
  | CheckoutPhoneVerificationVailidateOtpStart
  | CheckoutPhoneVerificationVailidateOtpSuccess
  | CheckoutPhoneVerificationVailidateOtpFaild
  | ChangeStateToDefault;
