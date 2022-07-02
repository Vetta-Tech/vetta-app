import axios from '../../api/axios';

import {CheckoutActionTypes} from '../actionTypes/checkout';
import {CheckoutAction} from '../actions/checkout';
import {Dispatch} from 'redux';

export const createNewOrder =
  () => async (dispatch: Dispatch<CheckoutAction>) => {
    dispatch({
      type: CheckoutActionTypes.CREACT_NEW_ORDER_START,
    });

    try {
      const response = axios.post('orders/create-order');
      dispatch({
        type: CheckoutActionTypes.CREACT_NEW_ORDER_SUCCESS,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CheckoutActionTypes.CREACT_NEW_ORDER_FAILD,
          error: error.message,
        });
      }
    }
  };

export const checkPhoneValidOrNot =
  (bottomSheetRef: any) => async (dispatch: Dispatch<CheckoutAction>) => {
    dispatch({
      type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_START,
    });

    try {
      const response = await axios.get('user/is-phone-number-valid');

      if (response.status === 200) {
        if (!response.data.is_phone_verified) {
          bottomSheetRef.open();
        }
        dispatch({
          type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_SUCCESS,
          is_phone_verified: response.data.is_phone_verified,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CheckoutActionTypes.CHECK_PHONE_VALID_NOT_FAILD,
          error: error.message,
        });
      }
    }
  };

export const checkoutPhoneVerificationOtpSent =
  (phone_number: number | string) =>
  async (dispatch: Dispatch<CheckoutAction>) => {
    dispatch({
      type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_START,
    });

    try {
      const data = {
        phone_number: '+880' + phone_number,
      };
      const response = await axios.post('user/generate-otp', data);
      dispatch({
        type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_SUCCESS,
        pk: response.data.pk,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_OTP_SENT_FAILD,
          error: error.message,
        });
      }
    }
  };

export const checkoutPhoneVerificationValidateOtp =
  (
    bottomSheetRef: any,
    otp: number | string,
    pk: number,
    phone_number: number | string,
  ) =>
  async (dispatch: Dispatch<CheckoutAction>) => {
    dispatch({
      type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_START,
    });

    try {
      const data = {
        otp,
        pk,
        phone_number,
      };
      const response = await axios.post('user/validate-otp', data);
      bottomSheetRef.close();
      dispatch({
        type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_SUCCESS,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CheckoutActionTypes.CHECKOUT_NUMBER_VERIFICATION_VALIDATE_OTP_FAILD,
          error: error.message,
        });
      }
    }
  };

export const changeStateToDefault =
  () => (dispatch: Dispatch<CheckoutAction>) => {
    dispatch({
      type: CheckoutActionTypes.CHANGE_TO_DEFAULT_STATE,
    });
  };
