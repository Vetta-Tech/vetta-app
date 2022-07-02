import {combineReducers} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';

import Auth from './reducers/auth';
import Product from './reducers/products';
import Category from './reducers/category';
import Supplier from './reducers/supplier';
import Cart from './reducers/cart';
import ProductDetails from './reducers/productDetails';
import Checkout from './reducers/checkout';
import Address from './reducers/address';
import {configureStore} from '@reduxjs/toolkit';
import {AppActionType} from './actions/intex';

const reducers = combineReducers({
  auth: Auth,
  product: Product,
  categories: Category,
  supplier: Supplier,
  address: Address,
  productDetails: ProductDetails,
  cart: Cart,
  checkout: Checkout,
});

export type AppState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      thunk as ThunkMiddleware<AppState, AppActionType>,
    ),
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
