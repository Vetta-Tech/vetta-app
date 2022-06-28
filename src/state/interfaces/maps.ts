export interface UserAddress {
  id: number;
  lattitude: number;
  longtitude: number;
  address: string;
  special_instruction: string;
  address_coices: string;
}

export interface MapsTypes {
  loading: boolean;
  error: string;
  address: string;
  sub_district: string;
  lattitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  showErrorModal: boolean;
  user_have_address: boolean;
  userAddress: UserAddress;
  navigatePage: string;
  status: number;
  userAddressText: string;
  createStatus: number;
  updateStatus: number;
}

export interface BarikoiMapTypes {
  place: {
    address: string;
    district: string;
    sub_district: string;
  };
}

export interface UserCanEditOrCreate {
  user_have_address: boolean;
  user_address: UserAddress;
}

export interface AddressComponents {
  house?: any;
  place_name: string;
  road?: any;
}

export interface AreaComponents {
  area: string;
  sub_area?: any;
}

export interface Place {
  address: string;
  address_components: AddressComponents;
  area: string;
  area_components: AreaComponents;
  city: string;
  country: string;
  distance_within_meters: number;
  district: string;
  division: string;
  id: number;
  location_type: string;
  pauroshova?: any;
  postCode: number;
  sub_district: string;
  union?: any;
}

export interface RootObject {
  place: Place;
  status: number;
}
