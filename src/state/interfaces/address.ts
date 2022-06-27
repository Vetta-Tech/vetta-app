import {UserAddress} from './maps';

export interface AddressInterface {
  loading: boolean;
  error: string;
  userAddress: string;
}

export interface CreateUserPostData {
  lattitude: number;
  longtitude: number;
  address: string;
}

export interface UpdateUserPostData {
  lattitude: number;
  longtitude: number;
  address: string;
  id: number;
}

export interface CreateUserPostDataResponse {
  address: UserAddress;
  status: number;
}

export interface SaveCoordToLocalPostType {
  lat: number;
  lng: number;
}
