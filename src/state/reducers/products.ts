import {ActionType} from '../actionTypes/index';

import {ProductsAction} from '../actions/products';
import {HomeProductsType} from '../interfaces/products';

const initialState: HomeProductsType = {
  featured: [],
  recent_products: [],
  popular: [],
  electronics: [],
  footwear: [],
  baby_care: [],
  product: {},
  images: {},
  loading: false,
  error: '',
  brandProducts: [],
};

const reducers = (
  state = initialState,
  action: ProductsAction,
): HomeProductsType => {
  switch (action.type) {
    case ActionType.HOME_PRODUCTS_FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case ActionType.HOME_PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        featured: action.payload.featured,
        recent_products: action.payload.recent_products,
        electronics: action.payload.electronics,
        baby_care: action.payload.baby_care,
        footwear: action.payload.footwear,
        popular: action.payload.popular,
      };
    case ActionType.HOME_PRODUCTS_FETCH_FAILD:
      return {
        ...state,
        loading: false,
      };
    case ActionType.FETCH_PRODUCTS_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FETCH_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.products,
        images: action.payload.images,
      };
    case ActionType.FETCH_PRODUCTS_DETAILS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.FETCH_PRODUCTS_BRANDS_START:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FETCH_PRODUCTS_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brandProducts: action.payload,
      };
    case ActionType.FETCH_PRODUCTS_BRANDS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
