import {ActionType} from '../actionTypes/index';

import {HomeProductsType, ProductsInterface} from '../interfaces/products';

interface HomeProductFetchStart {
  type: ActionType.HOME_PRODUCTS_FETCH_START;
}

interface HomeProductFetchSuccess {
  type: ActionType.HOME_PRODUCTS_FETCH_SUCCESS;
  payload: HomeProductsType;
}

interface HomeProductFetchFaild {
  type: ActionType.HOME_PRODUCTS_FETCH_FAILD;
  payload: string;
}

interface FetchProductDetailsStart {
  type: ActionType.FETCH_PRODUCTS_DETAILS_START;
}

interface FetchProductDetailsSuccess {
  type: ActionType.FETCH_PRODUCTS_DETAILS_SUCCESS;
  payload: ProductsInterface;
}

interface FetchProductDetailsFaild {
  type: ActionType.FETCH_PRODUCTS_DETAILS_FAILD;
  payload: string;
}

interface FetchProductByBrandStart {
  type: ActionType.FETCH_PRODUCTS_BRANDS_START;
}

interface FetchProductByBrandSuccess {
  type: ActionType.FETCH_PRODUCTS_BRANDS_SUCCESS;
  payload: ProductsInterface[];
}

interface FetchProductByBrandFaild {
  type: ActionType.FETCH_PRODUCTS_BRANDS_FAILD;
  payload: string;
}

export type ProductsAction =
  | HomeProductFetchStart
  | HomeProductFetchSuccess
  | HomeProductFetchFaild
  | FetchProductByBrandStart
  | FetchProductByBrandSuccess
  | FetchProductByBrandFaild
  | FetchProductDetailsStart
  | FetchProductDetailsSuccess
  | FetchProductDetailsFaild;
