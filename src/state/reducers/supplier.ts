import {SupplierFetch} from '../actions/supplier';
import {BrandsTypes} from '../../utils/types/brandsType';
import {SupplierActiontypes} from '../actionTypes/supplier';
import {ProductsInterface} from '../interfaces/products';

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

const InitialState: SupplierTypes = {
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

const reducer = (state = InitialState, action: SupplierFetch) => {
  switch (action.type) {
    case SupplierActiontypes.FETCH_SUPPLIER_START:
      return {
        ...state,
        loading: true,
      };
    case SupplierActiontypes.FETCH_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
      };
    case SupplierActiontypes.FETCH_SUPPLIER_FAILD:
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
