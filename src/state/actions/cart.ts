import {CartActionTypes} from '../actionTypes/cart';
import {CartData, FinalCart} from '../interfaces/cart';

interface cartFetchStart {
  type: CartActionTypes.FETCH_CART_START;
}

interface cartFetchSuccess {
  type: CartActionTypes.FETCH_CART_SUCCESS;
  cart: CartData[];
  final_cart: FinalCart;
  cartDataNull?: boolean | null;
}

interface cartFetchFaild {
  type: CartActionTypes.FETCH_CART_FAILD;
  error: string;
}

interface increaseCartQuantityStart {
  type: CartActionTypes.INCREASE_QUANTITY_START;
}

interface increaseCartQuantitySuccess {
  type: CartActionTypes.INCREASE_QUANTITY_SUCCESS;
  payload: boolean;
}

interface increaseCartQuantityFaild {
  type: CartActionTypes.INCREASE_QUANTITY_FAILD;
  error: string;
}

interface decreaseCartQuantityStart {
  type: CartActionTypes.DECREASE_QUANTITY_START;
}

interface decreaseCartQuantitySuccess {
  type: CartActionTypes.DECREASE_QUANTITY_SUCCESS;
  payload: boolean;
}

interface decreaseCartQuantityFaild {
  type: CartActionTypes.DECREASE_QUANTITY_FAILD;
  error: string;
}

interface couponAddStart {
  type: CartActionTypes.COUPON_ADD_START;
}

interface couponAddedSuccess {
  type: CartActionTypes.COUPON_ADD_SUCCESS;
  payload: boolean;
}

interface couponAddFaild {
  type: CartActionTypes.COUPON_ADD_FAILD;
  error: string;
}

export type CartActions =
  | cartFetchStart
  | cartFetchSuccess
  | cartFetchFaild
  | increaseCartQuantityStart
  | increaseCartQuantitySuccess
  | increaseCartQuantityFaild
  | decreaseCartQuantityStart
  | decreaseCartQuantitySuccess
  | decreaseCartQuantityFaild
  | couponAddStart
  | couponAddedSuccess
  | couponAddFaild;
