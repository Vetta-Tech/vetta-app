import {
  fetchHomeProducts,
  fetchProductDetails,
  fetchProductByBrand,
} from './products';

import {getchAllCategories} from './category';

import {fetchBrands} from './supplier';

import {
  fetchUserAddress,
  fetchReverseAddress,
  saveLocalAddressToDb,
  checkUserCanCreateOrEdit,
  saveUserCoorsToStorage,
  createUserLocation,
  updateUserLocation,
  resetUpdateStateStatus,
  resetCreateStateStatus,
} from '../actionCreatores/address';
import {productDetailsFetch, checkCanAddToCart} from './productDetails';
import {
  fetchUserCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleCouponAdded,
} from './cart';
import {
  createNewOrder,
  checkPhoneValidOrNot,
  checkoutPhoneVerificationOtpSent,
  checkoutPhoneVerificationValidateOtp,
  changeStateToDefault,
} from './checkout';
import {createFeedBack} from './profile';

export {
  fetchHomeProducts,
  fetchProductDetails,
  fetchProductByBrand,
  getchAllCategories,
  fetchBrands,
  fetchUserAddress,
  fetchReverseAddress,
  saveLocalAddressToDb,
  checkUserCanCreateOrEdit,
  saveUserCoorsToStorage,
  createUserLocation,
  updateUserLocation,
  resetUpdateStateStatus,
  resetCreateStateStatus,
  productDetailsFetch,
  checkCanAddToCart,
  fetchUserCart,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleCouponAdded,
  createNewOrder,
  checkPhoneValidOrNot,
  checkoutPhoneVerificationOtpSent,
  checkoutPhoneVerificationValidateOtp,
  changeStateToDefault,
  createFeedBack,
};
