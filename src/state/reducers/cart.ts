import {CartActionTypes} from '../actionTypes/cart';
import {CartActions} from '../actions/cart';
import {CartState} from '../interfaces/cart';

const InitialState: CartState = {
  loading: false,
  error: '',
  cartData: [],
  final_cart: {
    id: 0,
    total: 0,
    sub_total: 0,
    total_saved: 0,
  },
  couponAddedSuccess: false,
  increaseQuantitySuccess: false,
  decreaseQuantitySuccess: false,
  coupon_add_error: '',

  price: 0,
  cartDataNull: false,
};

const reducer = (state = InitialState, action: CartActions): CartState => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_START:
      return {
        ...state,
        loading: true,
      };
    case CartActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartDataNull: action.cartDataNull!,
        cartData: action.cart,
        final_cart: action.final_cart,
      };
    case CartActionTypes.FETCH_CART_FAILD:
      return {
        ...state,
        loading: false,
        error: 'Something went wrong',
        cartData: [],
        final_cart: {
          id: 0,
          total: 0,
          sub_total: 0,
          total_saved: 0,
        },
      };
    case CartActionTypes.INCREASE_QUANTITY_START:
      return {
        ...state,
        loading: true,
      };
    case CartActionTypes.INCREASE_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        increaseQuantitySuccess: action.payload,
      };
    case CartActionTypes.INCREASE_QUANTITY_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CartActionTypes.DECREASE_QUANTITY_START:
      return {
        ...state,
        loading: true,
      };
    case CartActionTypes.DECREASE_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        decreaseQuantitySuccess: action.payload,
      };
    case CartActionTypes.DECREASE_QUANTITY_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CartActionTypes.COUPON_ADD_START:
      return {
        ...state,
        loading: true,
      };
    case CartActionTypes.COUPON_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        couponAddedSuccess: action.payload,
      };
    case CartActionTypes.COUPON_ADD_FAILD:
      return {
        ...state,
        loading: false,
        couponAddedSuccess: false,
        coupon_add_error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
