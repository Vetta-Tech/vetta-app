import {combineReducers} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';

import Auth from './reducers/auth';
import Product from './reducers/products';
import Category from './reducers/category';
import Supplier from './reducers/supplier';
import Map from './reducers/maps';
import Address from './reducers/address';
import {configureStore} from '@reduxjs/toolkit';
import {AppActionType} from './actions/intex';

const reducers = combineReducers({
  auth: Auth,
  product: Product,
  categories: Category,
  supplier: Supplier,
  address: Address,
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
