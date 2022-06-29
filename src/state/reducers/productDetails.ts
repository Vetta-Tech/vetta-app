import {ProductDetailsActionType} from '../actionTypes/productDetails';

import {DetailsActions} from '../actions/productDetails';

import {ProductDetailsInterface} from '../interfaces/products';

const InitialState: ProductDetailsInterface = {
  products: {
    id: 0,
    supplier_name: '',
    name: '',
    slug: '',
    category: {
      name: '',
      slug: '',
      keywords: [],
      description: '',
      image: '',
      status: '',
    },
    sub_category: {
      name: '',
      slug: '',
      category: {
        name: '',
        slug: '',
        keywords: [],
        description: '',
        image: '',
        status: '',
      },
      keywords: [],
      description: '',
      image: '',
      status: '',
    },
    short_description: '',
    description: '',
    keywords: [],
    thumbnail: '',
    price: 0,
    variants: '',
    status: '',
  },
  variants: [],
  images: [],
  loading: false,
  error: '',
  canAddToCart: false,
};

const reducer = (
  state = InitialState,
  action: DetailsActions,
): ProductDetailsInterface => {
  switch (action.type) {
    case ProductDetailsActionType.FETCH_PRODUCT_DETAILS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductDetailsActionType.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        images: action.payload.images,
        variants: action.payload.variants,
      };
    case ProductDetailsActionType.FETCH_PRODUCT_DETAILS_FAILD:
      return {
        ...state,
        loading: false,
        error: 'Something went wrong',
      };

    case ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        canAddToCart: action.payload,
      };
    case ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_FAILD:
      return {
        ...state,
        canAddToCart: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
