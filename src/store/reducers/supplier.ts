import {AnyAction} from 'redux';
import {
  FETCH_SUPPLIER_START,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILD,
} from '../types';
import {BrandsTypes} from '../../utils/types/brandsType';

export interface SupplierTypes {
  brands: BrandsTypes[];
  loading: boolean;
  error: string;
}

const initialState: SupplierTypes = {
  brands: [],
  loading: false,
  error: '',
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
    default:
      return state;
  }
};

export default reducer;
