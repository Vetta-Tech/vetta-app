import {Dispatch} from 'redux';
import axios from '../../api/axios';

import {AddressActionTypes} from '../actionTypes/address';
import {UserAddressActionType} from '../actions/address';
import {AppState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootObject} from '../interfaces/maps';
import {
  CreateUserPostData,
  SaveCoordToLocalPostType,
  UpdateUserPostData,
} from '../interfaces/address';

const BARIKOI_API = 'MzQ3MjpKM0JHWkI4WDc1';

export const fetchUserAddress =
  () =>
  async (
    dispatch: Dispatch<UserAddressActionType>,
    getState: () => AppState,
  ) => {
    dispatch({
      type: AddressActionTypes.FETCH_USER_ADDRESS_START,
    });

    try {
      const response = await axios.get('address/user-address');
      dispatch({
        type: AddressActionTypes.FETCH_USER_ADDRESS_SUCCESS,
        payload: response.data.user_address.address,
        user_have_address: response.data.user_have_address,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.FETCH_USER_ADDRESS_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const fetchReverseAddress =
  (coords: {lat: number; lng: number}) =>
  async (
    dispatch: Dispatch<UserAddressActionType>,
    getState: () => AppState,
  ) => {
    dispatch({
      type: AddressActionTypes.FETCH_REVERSE_ADDRESS_START,
    });

    try {
      const response = await axios.get(
        `https://barikoi.xyz/v1/api/search/reverse/${BARIKOI_API}/geocode?longitude=${coords.lng}&latitude=${coords.lat}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true`,
      );

      const data: RootObject = response.data;
      dispatch({
        type: AddressActionTypes.FETCH_REVERSE_ADDRESS_SUCCESS,
        payload: data.place.address,
        data: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.FETCH_REVERSE_ADDRESS_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const saveLocalAddressToDb =
  (data: {lat: number; lng: number}) =>
  async (
    dispatch: Dispatch<UserAddressActionType>,
    getState: () => AppState,
  ) => {
    dispatch({
      type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_START,
    });

    try {
      const response = await axios.post(`address/save-local-address`, data);
      dispatch({
        type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_SUCCESS,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const checkUserCanCreateOrEdit =
  () =>
  async (
    dispatch: Dispatch<UserAddressActionType>,
    getState: () => AppState,
  ) => {
    dispatch({
      type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_START,
    });

    try {
      const response = await axios.get(`address/user-address`);
      dispatch({
        type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const saveUserCoorsToStorage =
  (data: SaveCoordToLocalPostType) =>
  async (dispatch: Dispatch<UserAddressActionType>) => {
    try {
      await AsyncStorage.setItem(
        'USER_COORDINATES',
        JSON.stringify({
          lat: data.lat,
          lng: data.lng,
        }),
      );
      dispatch({
        type: AddressActionTypes.SAVE_COORD_TO_LOCAL_STORE,
        status: 201,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.SAVE_COORD_TO_LOCAL_FAILD,
          error: error.message,
        });
      }
    }
  };

export const createUserLocation =
  (data: CreateUserPostData) =>
  async (dispatch: Dispatch<UserAddressActionType>) => {
    dispatch({
      type: AddressActionTypes.CREATE_USER_ADDRESS_START,
    });

    try {
      const response = await axios.post('address/create-address', data);
      const coords = {
        lat: data.lattitude,
        lng: data.longtitude,
      };
      saveUserCoorsToStorage(coords);
      dispatch({
        type: AddressActionTypes.CREATE_USER_ADDRESS_SUCCESS,
        payload: response.data,
        status: response.status,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.CREATE_USER_ADDRESS_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const updateUserLocation =
  (data: UpdateUserPostData) =>
  async (dispatch: Dispatch<UserAddressActionType>) => {
    dispatch({
      type: AddressActionTypes.UPDATE_USER_ADDRESS_START,
    });

    try {
      const response = await axios.put(`address/edit/${data.id}`, data);

      const coords = {
        lat: data.lattitude,
        lng: data.longtitude,
      };
      saveUserCoorsToStorage(coords);
      dispatch({
        type: AddressActionTypes.UPDATE_USER_ADDRESS_SUCCESS,
        payload: response.data,
        status: response.status,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: AddressActionTypes.UPDATE_USER_ADDRESS_FAILD,
          payload: error.message,
        });
      }
    }
  };

export const resetUpdateStateStatus = () => (dispatch: Dispatch) => {
  dispatch({
    type: AddressActionTypes.RESET_UPDATE_STATE_STATUS,
  });
};

export const resetCreateStateStatus = () => (dispatch: Dispatch) => {
  dispatch({
    type: AddressActionTypes.RESET_CREATE_STATE_STATUS,
  });
};
