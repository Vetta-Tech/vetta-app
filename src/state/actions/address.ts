import {AddressActionTypes} from '../actionTypes/address';
import {CreateUserPostDataResponse} from '../interfaces/address';
import {BarikoiMapTypes, UserCanEditOrCreate} from '../interfaces/maps';

interface FectUserAddressStart {
  type: AddressActionTypes.FETCH_USER_ADDRESS_START;
}

interface FectUserAddressSuccess {
  type: AddressActionTypes.FETCH_USER_ADDRESS_SUCCESS;
  payload: string;
}

interface FectUserAddressFaild {
  type: AddressActionTypes.FETCH_USER_ADDRESS_FAILD;
  payload: string;
}

interface FectReverseAddressStart {
  type: AddressActionTypes.FETCH_REVERSE_ADDRESS_START;
}

interface FectReverseAddressSuccess {
  type: AddressActionTypes.FETCH_REVERSE_ADDRESS_SUCCESS;
  payload: string;
  data: BarikoiMapTypes;
}

interface FectReverseAddressFaild {
  type: AddressActionTypes.FETCH_REVERSE_ADDRESS_FAILD;
  payload: string;
}

interface SaveLocalAddressToDBStart {
  type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_START;
}

interface SaveLocalAddressToDBSuccess {
  type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_SUCCESS;
}

interface SaveLocalAddressToDBFaild {
  type: AddressActionTypes.SAVE_LOCAL_ADDRESS_TO_DB_FAILD;
  payload: string;
}

interface UserCanEditOrCreateAddressStart {
  type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_START;
}

interface UserCanEditOrCreateAddressSuccess {
  type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_SUCCESS;
  payload: UserCanEditOrCreate;
}
interface UserCanEditOrCreateAddresFaild {
  type: AddressActionTypes.CHECK_USER_EDIT_OR_CREATE_FAILD;
  payload: string;
}

interface CreateUserAddressStart {
  type: AddressActionTypes.CREATE_USER_ADDRESS_START;
}

interface CreateUserAddressSuccess {
  type: AddressActionTypes.CREATE_USER_ADDRESS_SUCCESS;
  payload: CreateUserPostDataResponse;
}

interface CreateUserAddressFaild {
  type: AddressActionTypes.CREATE_USER_ADDRESS_FAILD;
  payload: string;
}

interface SaveCoordToLocalStorageSuccess {
  type: AddressActionTypes.SAVE_COORD_TO_LOCAL_STORE;
}

interface SaveCoordToLocalStorageFaild {
  type: AddressActionTypes.SAVE_COORD_TO_LOCAL_FAILD;
  error: string;
}

interface UpdateUserAddressStart {
  type: AddressActionTypes.UPDATE_USER_ADDRESS_START;
}

interface UpdateUserAddressSuccess {
  type: AddressActionTypes.UPDATE_USER_ADDRESS_SUCCESS;
  payload: CreateUserPostDataResponse;
}

interface UpdateUserAddressFaild {
  type: AddressActionTypes.UPDATE_USER_ADDRESS_FAILD;
  payload: string;
}

export type UserAddressActionType =
  | FectUserAddressStart
  | FectUserAddressSuccess
  | FectUserAddressFaild
  | FectReverseAddressStart
  | FectReverseAddressSuccess
  | FectReverseAddressFaild
  | SaveLocalAddressToDBStart
  | SaveLocalAddressToDBSuccess
  | SaveLocalAddressToDBFaild
  | UserCanEditOrCreateAddresFaild
  | UserCanEditOrCreateAddressStart
  | UserCanEditOrCreateAddressSuccess
  | CreateUserAddressStart
  | CreateUserAddressSuccess
  | CreateUserAddressFaild
  | SaveCoordToLocalStorageSuccess
  | SaveCoordToLocalStorageFaild
  | UpdateUserAddressStart
  | UpdateUserAddressSuccess
  | UpdateUserAddressFaild;
