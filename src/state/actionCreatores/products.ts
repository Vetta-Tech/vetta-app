import {Dispatch} from 'redux';

import axios from '../../api/axios';
import {ActionType} from '../actionTypes';
import {ProductsAction} from '../actions/products';
import {AppState} from '../store';

const fetchHomeProducts =
  () =>
  async (dispatch: Dispatch<ProductsAction>, getState: () => AppState) => {
    dispatch({
      type: ActionType.HOME_PRODUCTS_FETCH_START,
    });

    const response = await axios.get('products/home');
    try {
      dispatch({
        type: ActionType.HOME_PRODUCTS_FETCH_SUCCESS,
        payload: response.data,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('err', err.message);
        dispatch({
          type: ActionType.HOME_PRODUCTS_FETCH_FAILD,
          payload: err.message,
        });
      }
    }
  };

const fetchProductDetails =
  (slug: string) =>
  async (dispatch: Dispatch<ProductsAction>, getState: () => AppState) => {
    dispatch({
      type: ActionType.FETCH_PRODUCTS_DETAILS_START,
    });

    const response = await axios.get(`products/details/${slug}`);

    try {
      dispatch({
        type: ActionType.FETCH_PRODUCTS_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_PRODUCTS_DETAILS_FAILD,
          payload: err.message,
        });
      }
    }
  };

const fetchProductByBrand =
  (brands_name: string) =>
  async (dispatch: Dispatch<ProductsAction>, getState: () => AppState) => {
    dispatch({
      type: ActionType.FETCH_PRODUCTS_BRANDS_START,
    });

    const response = await axios.get('products/brands');

    try {
      dispatch({
        type: ActionType.FETCH_PRODUCTS_BRANDS_SUCCESS,
        payload: response.data.products,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_PRODUCTS_BRANDS_FAILD,
          payload: err.message,
        });
      }
    }
  };

export {fetchHomeProducts, fetchProductDetails, fetchProductByBrand};
