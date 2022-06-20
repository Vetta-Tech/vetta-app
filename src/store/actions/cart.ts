import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AppDispatch} from '../reducers';
import * as actionTypes from '../types';

export const handleAddToCart = (data: {}) => async (dispatch: AppDispatch) => {
  dispatch({
    type: actionTypes.ADD_TO_CART_START,
  });

  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      Authorization: 'Token '.concat(token!),
      'Content-Type': 'application/json',
    },
  };

  console.log('config', config);
  console.log('data', data);

  axios
    .post(`${API_URL}cart/add-to-cart`, data, config)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: res.data.item,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
