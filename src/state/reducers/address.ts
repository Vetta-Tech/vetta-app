import {AddressActionTypes} from '../actionTypes/address';
import {UserAddressActionType} from '../actions/address';

import {AddressInterface} from '../interfaces//address';
import {MapsTypes} from '../interfaces/maps';

const initialState: MapsTypes = {
  loading: false,
  error: '',
  lattitude: 0,
  longitude: 0,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
  address: '',
  sub_district: '',
  showErrorModal: false,
  create_address: false,
  userAddress: {
    id: 0,
    lattitude: 0,
    longtitude: 0,
    address: '',
    special_instruction: '',
    address_coices: '',
  },
  userAddressText: '',
  navigatePage: '',
  status: 0,
};

const reducer = (
  state = initialState,
  action: UserAddressActionType,
): MapsTypes => {
  switch (action.type) {
    case AddressActionTypes.FETCH_USER_ADDRESS_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.FETCH_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAddressText: action.payload,
      };
    case AddressActionTypes.FETCH_USER_ADDRESS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAddressText: action.payload,
        sub_district: action.data.place.sub_district,
      };
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_FAILD:
      return {
        ...state,
        loading: false,
      };
    case AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        create_address: action.payload.user_have_address,
      };
    case AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AddressActionTypes.SAVE_COORD_TO_LOCAL_STORE:
      return {
        ...state,
      };

    case AddressActionTypes.SAVE_COORD_TO_LOCAL_FAILD:
      return {
        ...state,
        error: action.error,
      };

    case AddressActionTypes.CREATE_USER_ADDRESS_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.CREATE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAddress: action.payload.address,
        status: action.payload.status,
      };
    case AddressActionTypes.CREATE_USER_ADDRESS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AddressActionTypes.UPDATE_USER_ADDRESS_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.UPDATE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAddress: action.payload.address,
        status: action.payload.status,
      };
    case AddressActionTypes.UPDATE_USER_ADDRESS_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
