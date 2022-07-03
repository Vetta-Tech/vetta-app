import {Dispatch} from 'redux';
import Toast from 'react-native-toast-message';

import axios from '../../api/axios';
import {CartActionTypes} from '../actionTypes/cart';
import {CartActions} from '../actions/cart';

export const fetchUserCart = () => async (dispatch: Dispatch<CartActions>) => {
  dispatch({
    type: CartActionTypes.FETCH_CART_START,
  });

  try {
    const response = await axios.get('cart/cart-list');

    dispatch({
      type: CartActionTypes.FETCH_CART_SUCCESS,
      cartDataNull: response.data.lenght === 0 ? true : false,
      cart: response.data.cart_qs,
      final_cart: response.data.final_cart,
    });
  } catch (error) {
    if (error instanceof Error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'top',
      });
      dispatch({
        type: CartActionTypes.FETCH_CART_FAILD,
        error: error.message,
      });
    }
  }
};

export const handleIncreaseQuantity =
  (id: number, variant_id: number) =>
  async (dispatch: Dispatch<CartActions>) => {
    dispatch({
      type: CartActionTypes.INCREASE_QUANTITY_START,
    });

    const data = {
      id,
      variant_id,
    };

    try {
      const response = await axios.post('cart/plus-quantity', data);
      dispatch<any>(fetchUserCart());
      Toast.show({
        type: 'customSuccess',
        text1: 'Cart Quantity Increased',
        position: 'top',
      });
      dispatch({
        type: CartActionTypes.INCREASE_QUANTITY_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'top',
        });
        dispatch({
          type: CartActionTypes.INCREASE_QUANTITY_FAILD,
          error: error.message,
        });
      }
    }
  };

export const handleDecreaseQuantity =
  (id: number, variant_id: number) =>
  async (dispatch: Dispatch<CartActions>) => {
    dispatch({
      type: CartActionTypes.DECREASE_QUANTITY_START,
    });

    const data = {
      id,
      variant_id,
    };

    try {
      const response = await axios.post('cart/minus-quantity', data);
      dispatch<any>(fetchUserCart());
      Toast.show({
        type: 'customSuccess',
        text1: 'Cart Quantity Decreased',
        position: 'top',
      });
      dispatch({
        type: CartActionTypes.DECREASE_QUANTITY_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'top',
        });
        dispatch({
          type: CartActionTypes.DECREASE_QUANTITY_FAILD,
          error: error.message,
        });
      }
    }
  };

export const handleCouponAdded =
  (data: {coupon_code: string; final_cart_id: number}) =>
  async (dispatch: Dispatch<CartActions>) => {
    dispatch({
      type: CartActionTypes.COUPON_ADD_START,
    });

    try {
      const response = await axios.post('cart/coupon-add', data);
      console.log(response);
      dispatch<any>(fetchUserCart());
      if (response.status === 200) {
        Toast.show({
          type: 'customSuccess',
          text1: 'Coupon Added Successfully',
          position: 'top',
        });
      }
      dispatch({
        type: CartActionTypes.COUPON_ADD_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'top',
        });
        dispatch({
          type: CartActionTypes.COUPON_ADD_FAILD,
          error: error.message,
        });
      }
    }
  };
