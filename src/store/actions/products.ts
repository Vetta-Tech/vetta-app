import axios from 'axios';
import {API_URL} from '@env';
import {AppDispatch} from '../reducers';

import {
  HOME_PRODUCTS_FETCH_START,
  HOME_PRODUCTS_FETCH_SUCCESS,
  HOME_PRODUCTS_FETCH_FAILD,
  FETCH_PRODUCTS_DETAILS_START,
  FETCH_PRODUCTS_DETAILS_SUCCESS,
  FETCH_PRODUCTS_DETAILS_FAILD,
} from '../types';
import {ActionSheetIOS} from 'react-native';

export const fetchHomeProducts = () => (dispatch: AppDispatch) => {
  dispatch({
    type: HOME_PRODUCTS_FETCH_START,
  });

  axios
    .get(`${API_URL}products/home`)
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
        console.log(res.data);
        dispatch({
          type: FETCH_PRODUCTS_DETAILS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: FETCH_PRODUCTS_DETAILS_FAILD,
          err: err.response.data,
        });
      });
  };
