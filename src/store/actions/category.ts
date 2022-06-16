import axios from 'axios';
import {
  FETCH_ALL_CATEGORY_START,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_FAILD,
} from '../types';

import {API_URL} from '@env';
import {AppDispatch} from '../reducers';

export const getchAllCategories = () => (dispatch: AppDispatch) => {
  dispatch({
    type: FETCH_ALL_CATEGORY_START,
  });

  axios
    .get(`${API_URL}products/categories`)
    .then(res => {
      dispatch({
        type: FETCH_ALL_CATEGORY_SUCCESS,
        payload: res.data.categories,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ALL_CATEGORY_FAILD,
        payload: err.response.data,
      });
    });
};
