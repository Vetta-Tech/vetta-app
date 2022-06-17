import axios from 'axios';

import {API_URL} from '@env';
import {
  FETCH_SUPPLIER_START,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILD,
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
