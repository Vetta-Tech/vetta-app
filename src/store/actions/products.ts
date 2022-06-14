import axios from 'axios';
import {API_URL} from '@env';
import {AppDispatch} from '../reducers';

import {
  HOME_PRODUCTS_FETCH_START,
  HOME_PRODUCTS_FETCH_SUCCESS,
  HOME_PRODUCTS_FETCH_FAILD,
} from '../types';

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
