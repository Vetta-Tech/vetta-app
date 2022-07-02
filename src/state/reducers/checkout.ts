import {CheckoutAction} from '../actions/checkout';
import {CheckoutActionTypes} from '../actionTypes/checkout';

import {CheckouState} from '../interfaces/checkout';

const InitialState: CheckouState = {
  loading: false,
  error: '',
  is_phone_verified: null,
  phone_number: '',
  disableSubmit: true,
  sentOtpSuccess: false,
  pk: 0,
  otp: '',

  userAddress: '',
  showPlacholderTopText: false,
  textLength: 0,
  specialInstruction: '',
  payment_method: 'cash',
  order_create_success: false,
  order_create_error: '',
  GatewayPageURL: '',
  moadlShow: false,
};

const reducer = (
  state = InitialState,
  action: CheckoutAction,
): CheckouState => {
  switch (action.type) {
    case CheckoutActionTypes.CREACT_NEW_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case CheckoutActionTypes.CREACT_NEW_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order_create_success: true,
      };
    case CheckoutActionTypes.CREACT_NEW_ORDER_FAILD:
      return {
        ...state,
        loading: false,
        order_create_error: action.error,
      };
    case CheckoutActionTypes.CHECK_PHONE_VALID_NOT_START:
      return {
        ...state,
        loading: true,
      };
    case CheckoutActionTypes.CHECK_PHONE_VALID_NOT_SUCCESS:
      return {
        ...state,
        loading: false,
        is_phone_verified: action.is_phone_verified,
      };
    case CheckoutActionTypes.CHECK_PHONE_VALID_NOT_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_START:
      return {
        ...state,
        loading: true,
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_SUCCESS:
      return {
        ...state,
        loading: false,
        pk: action.pk,
        sentOtpSuccess: true,
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_START:
      return {
        ...state,
        loading: true,
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CheckoutActionTypes.CHANGE_TO_DEFAULT_STATE:
      return {
        loading: false,
        error: '',
        is_phone_verified: null,
        phone_number: '',
        disableSubmit: true,
        sentOtpSuccess: false,
        pk: 0,
        otp: '',
        userAddress: '',
        showPlacholderTopText: false,
        textLength: 0,
        specialInstruction: '',
        payment_method: 'cash',
        order_create_success: false,
        order_create_error: '',
        GatewayPageURL: '',
        moadlShow: false,
      };
    default:
      return state;
  }
};
export default reducer;
