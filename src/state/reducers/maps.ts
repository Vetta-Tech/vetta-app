import {AddressActionTypes} from '../actionTypes/address';
import {MapsTypes} from '../interfaces/maps';
import {UserAddressActionType} from '../actions/address';

const Initial_State: MapsTypes = {
  lattitude: 0,
  longitude: 0,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
  address: '',
  sub_district: '',
  loading: true,
  showErrorModal: false,
  userAddress: {
    id: 0,
    lattitude: 0,
    longtitude: 0,
    address: '',
    special_instruction: '',
    address_coices: '',
  },
  navigatePage: '',
  error: '',
  user_have_address: false,
  status: 0,
  userAddressText: '',
  createStatus: 0,
  updateStatus: 0,
};

const reducer = (
  state = Initial_State,
  action: UserAddressActionType,
): MapsTypes => {
  switch (action.type) {
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_START:
      return {
        ...state,
        loading: true,
      };
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.data.place.address,
      };
    case AddressActionTypes.FETCH_REVERSE_ADDRESS_FAILD:
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
