import {
  HOME_PRODUCTS_FETCH_FAILD,
  HOME_PRODUCTS_FETCH_START,
  HOME_PRODUCTS_FETCH_SUCCESS,
} from '../types';

export interface HomeProductsType {
  featured: [];
  recent_products: [];
  popular: [];
  electronics: [];
  footwear: [];
  baby_care: [];
  loading: boolean;
  error: string;
}

const initialState: HomeProductsType = {
  featured: [],
  recent_products: [],
  popular: [],
  electronics: [],
  footwear: [],
  baby_care: [],
  loading: false,
  error: '',
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
    default:
      return state;
  }
};

export default reducers;
