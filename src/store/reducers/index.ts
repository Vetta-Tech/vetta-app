import {combineReducers} from 'redux';
import {store} from '../../../App';
import auth, {AuthStateTypes} from './auth';
import products, {HomeProductsType} from './products';

export interface State {
  auth: AuthStateTypes;
  products: HomeProductsType;
}

export default combineReducers({
  auth: auth,
  products: products,
});

export type AppDispatch = typeof store.dispatch;
