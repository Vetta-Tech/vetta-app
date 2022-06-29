import {Dispatch} from 'redux';
import axios from '../../api/axios';

import {DetailsActions} from '../actions/productDetails';
import {ProductDetailsActionType} from '../actionTypes/productDetails';

export const productDetailsFetch =
  (slug: string) => async (dispatch: Dispatch<DetailsActions>) => {
    dispatch({
      type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_START,
    });

    try {
      const response = await axios.get(`products/details/${slug}`);

      dispatch({
        type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ProductDetailsActionType.FETCH_PRODUCT_DETAILS_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const checkCanAddToCart =
  (variant_id: number, product: string) =>
  async (dispatch: Dispatch<DetailsActions>) => {
    dispatch({
      type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_START,
    });

    try {
      const response = await axios.post('cart/check-add-to-cart', {
        variant_id,
        product,
      });

      dispatch({
        type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_SUCCESS,
        payload: response.data.msg,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ProductDetailsActionType.CHECK_CAN_ADD_TO_CART_SPECIFIC_PRODUCT_FAILD,
          payload: error.message,
        });
      }
    }
  };
