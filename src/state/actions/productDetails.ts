import {ProductDetailsActionType} from '../actionTypes/productDetails';
import {ProductsInterface} from '../interfaces/products';

interface ProductDetailsFetchStart {
  type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_START;
}

interface ProductDetailsFetchSuccess {
  type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_SUCCESS;
  payload: ProductsInterface;
}

interface ProductDetailsFetchFaild {
  type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_FAILD;
  payload: string;
}

interface CheckCanAddToCartDetailsPageStart {
  type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_START;
}

interface CheckCanAddToCartDetailsPageSuccess {
  type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_SUCCESS;
  payload: boolean;
}

interface CheckCanAddToCartDetailsPageFaild {
  type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_FAILD;
  payload: string;
}

export type DetailsActions =
  | ProductDetailsFetchFaild
  | ProductDetailsFetchStart
  | ProductDetailsFetchSuccess
  | CheckCanAddToCartDetailsPageStart
  | CheckCanAddToCartDetailsPageSuccess
  | CheckCanAddToCartDetailsPageFaild;
