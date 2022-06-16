import {
  HOME_PRODUCTS_FETCH_FAILD,
  HOME_PRODUCTS_FETCH_START,
  HOME_PRODUCTS_FETCH_SUCCESS,
  FETCH_PRODUCTS_DETAILS_START,
  FETCH_PRODUCTS_DETAILS_SUCCESS,
  FETCH_PRODUCTS_DETAILS_FAILD,
  FETCH_PRODUCTS_BRANDS_START,
  FETCH_PRODUCTS_BRANDS_SUCCESS,
  FETCH_PRODUCTS_BRANDS_FAILD,
} from '../types';

export interface HomeProductsType {
  featured: [];
  recent_products: [];
  popular: [];
  electronics: [];
  footwear: [];
  baby_care: [];
  product: {};
  images: {};
  variants: [];
  loading: boolean;
  error: string;
  brandProducts: [];
}

const initialState: HomeProductsType = {
  featured: [],
  recent_products: [],
  popular: [],
  electronics: [],
  footwear: [],
  baby_care: [],
  product: {},
  images: {},
  variants: [],
  loading: false,
  error: '',
  brandProducts: [],
};

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case HOME_PRODUCTS_FETCH_START:
      return {...state, loading: true};
    case HOME_PRODUCTS_FETCH_SUCCESS:
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
    case HOME_PRODUCTS_FETCH_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCTS_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.products,
        images: action.payload.images,
        variants: action.payload.variants,
      };
    case FETCH_PRODUCTS_DETAILS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCTS_BRANDS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brandProducts: action.payload,
      };
    case FETCH_PRODUCTS_BRANDS_FAILD:
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
