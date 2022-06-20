import axios from 'axios';
import {API_URL, API_URL_IMAGE} from '@env';
import {AppDispatch} from '../reducers';

import {
  HOME_PRODUCTS_FETCH_START,
  HOME_PRODUCTS_FETCH_SUCCESS,
  HOME_PRODUCTS_FETCH_FAILD,
  FETCH_PRODUCTS_DETAILS_START,
  FETCH_PRODUCTS_DETAILS_SUCCESS,
  FETCH_PRODUCTS_DETAILS_FAILD,
  FETCH_PRODUCTS_BRANDS_START,
  FETCH_PRODUCTS_BRANDS_SUCCESS,
  FETCH_PRODUCTS_BRANDS_FAILD,
} from '../types';

console.log(`${API_URL}products/home`);
console.log(`${API_URL_IMAGE}products/home`);

export const fetchHomeProducts = () => (dispatch: AppDispatch) => {
  dispatch({
    type: HOME_PRODUCTS_FETCH_START,
  });

  axios
    .get(`http://192.168.0.204:8000/api/v1/products/home`)
    .then(res => {
      dispatch({
        type: HOME_PRODUCTS_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: HOME_PRODUCTS_FETCH_FAILD,
        payload: err,
      });
    });
};

export const fetchProductDetails =
  (slug: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: FETCH_PRODUCTS_DETAILS_START,
    });

    axios
      .get(`${API_URL}products/details/${slug}`)
      .then(res => {
        dispatch({
          type: FETCH_PRODUCTS_DETAILS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_PRODUCTS_DETAILS_FAILD,
          err: err.response.data,
        });
      });
  };

export const fetchProductByBrand =
  (brands_name: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: FETCH_PRODUCTS_BRANDS_START,
    });

    console.log('brands_name', brands_name);

    axios
      .get(`${API_URL}products/brands`, {
        params: {
          brands_name: brands_name,
        },
      })
      .then(res => {
        dispatch({
          type: FETCH_PRODUCTS_BRANDS_SUCCESS,
          payload: res.data.products,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_PRODUCTS_BRANDS_FAILD,
          payload: err.data.err,
        });
      });
  };
