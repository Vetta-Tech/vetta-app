import {Dispatch} from 'redux';

import axios from '../../api/axios';
import {SupplierActiontypes} from '../actionTypes/supplier';
import {SupplierFetch} from '../actions/supplier';
import {AppState} from '../store';

export const fetchBrands =
  () => async (dispatch: Dispatch<SupplierFetch>, getState: () => AppState) => {
    dispatch({
      type: SupplierActiontypes.FETCH_SUPPLIER_START,
    });

    const response = await axios.get('supplier/list');
    console.log('response', response.data.products);

    try {
      dispatch({
        type: SupplierActiontypes.FETCH_SUPPLIER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: SupplierActiontypes.FETCH_SUPPLIER_FAILD,
          payload: error.message,
        });
      }
    }
  };
