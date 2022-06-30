import axios from '../../api/axios';
import {CartActionTypes} from '../actionTypes/cart';
import {CartActions} from '../actions/cart';
import {Dispatch} from 'redux';

export const fetchUserCart = () => async (dispatch: Dispatch<CartActions>) => {
  dispatch({
    type: CartActionTypes.FETCH_CART_START,
  });

  try {
    const response = await axios.get('cart/cart-list');

    if (response.data.cart_qs.lenght && response.data.final_cart.lenght === 0) {
      dispatch({
        type: CartActionTypes.FETCH_CART_SUCCESS,
        cart: response.data.cart_qs,
        final_cart: response.data.final_cart,
      });
    } else {
      dispatch({
        type: CartActionTypes.FETCH_CART_SUCCESS,
        cartDataNull: true,
        cart: response.data.cart_qs,
        final_cart: response.data.final_cart,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
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
      fetchUserCart();
      dispatch({
        type: CartActionTypes.INCREASE_QUANTITY_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
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
      fetchUserCart();
      dispatch({
        type: CartActionTypes.DECREASE_QUANTITY_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
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
      const response = axios.post('cart/coupon-add', data);
      fetchUserCart();
      dispatch({
        type: CartActionTypes.COUPON_ADD_SUCCESS,
        payload: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CartActionTypes.COUPON_ADD_FAILD,
          error: error.message,
        });
      }
    }
  };
