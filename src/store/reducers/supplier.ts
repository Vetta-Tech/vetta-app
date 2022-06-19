import {AnyAction} from 'redux';
import {
  FETCH_SUPPLIER_START,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILD,
  FETCH_SUPPLIER_DETAILS_START,
  FETCH_SUPPLIER_DETAILS_SUCCESS,
  FETCH_SUPPLIER_DETAILS_FAILD,
  FETCH_SUPPLIER_PRODUCTS_START,
  FETCH_SUPPLIER_PRODUCTS_SUCCESS,
  FETCH_SUPPLIER_PRODUCTS_FAILD,
} from '../types';
import {BrandsTypes} from '../../utils/types/brandsType';
import {ProductsInterface} from '../../utils/types/productTypes';

export interface SupplierTypes {
  brands: BrandsTypes[];
  products: ProductsInterface[];
  brand: BrandsTypes;
  data: {};
  loading: boolean;
  error: string;
  activeCat: string;
  limit: number;
  offset: number;
}

const initialState: SupplierTypes = {
  brands: [],
  data: {},
  products: [],
  brand: {
    name: '',
    cover_image: '',
    descrition: '',
    id: 0,
    slug: '',
    active: '',
    category: {
      name: '',
      slug: '',
      keywords: [],
      description: '',
      image: '',
      status: '',
    },
    logo: '',
  },
  loading: false,
  error: '',
  activeCat: '',
  limit: 10,
  offset: 0,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_SUPPLIER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
      };
    case FETCH_SUPPLIER_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SUPPLIER_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUPPLIER_DETAILS_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        data: action.data,
        loading: false,
      };
    case FETCH_SUPPLIER_DETAILS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SUPPLIER_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUPPLIER_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case FETCH_SUPPLIER_PRODUCTS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
