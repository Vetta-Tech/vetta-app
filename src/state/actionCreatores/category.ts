import {Dispatch} from 'redux';
import axios from '../../api/axios';

import {CategoryTypes} from '../actionTypes/category';
import {CategoryAction} from '../actions/category';
import {AppState} from '../store';

const getchAllCategories =
  () =>
  async (dispatch: Dispatch<CategoryAction>, getState: () => AppState) => {
    dispatch({
      type: CategoryTypes.FETCH_ALL_CATEGORY_START,
    });

    const response = await axios.get('products/categories');

    try {
      dispatch({
        type: CategoryTypes.FETCH_ALL_CATEGORY_SUCCESS,
        payload: response.data.categories,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: CategoryTypes.FETCH_ALL_CATEGORY_FAILD,
          payload: error.message,
        });
      }
    }
  };

export {getchAllCategories};
