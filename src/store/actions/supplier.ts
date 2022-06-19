import axios from 'axios';

import {API_URL} from '@env';
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
import {AppDispatch} from '../reducers';

export const fetchBrands = () => (dispatch: AppDispatch) => {
  dispatch({
    type: FETCH_SUPPLIER_START,
  });

  axios
    .get(`${API_URL}supplier/`)
    .then(res => {
      dispatch({
        type: FETCH_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SUPPLIER_FAILD,
        err: err,
      });
    });
};

export const fetchBrandsDetails = (slug: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: FETCH_SUPPLIER_DETAILS_START,
  });

  axios
    .get(`${API_URL}supplier/${slug}`)
    .then(res => {
      const data = res.data.category;
      console.log(typeof data);
      data.unshift({
        name: 'All Products',
        id: 0,
      });
      dispatch({
        type: FETCH_SUPPLIER_DETAILS_SUCCESS,
        payload: res.data,
        data: data,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SUPPLIER_DETAILS_FAILD,
        payload: err,
      });
    });
};

export const fetchBrndsProducts =
  (limit: number, offset: number, cat: string, supplier: string) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: FETCH_SUPPLIER_PRODUCTS_START,
    });

    axios
      .get(`${API_URL}supplier/brand-details?limit=${limit}&offset=${offset}`, {
        params: {
          cat: cat,
          supplier: supplier,
        },
      })
      .then(res => {
        dispatch({
          type: FETCH_SUPPLIER_PRODUCTS_SUCCESS,
          payload: res.data.products,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_SUPPLIER_PRODUCTS_FAILD,
          payload: err,
        });
      });
  };
