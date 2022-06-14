import {combineReducers} from 'redux';
import {store} from '../../../App';
import auth, {AuthStateTypes} from './auth';
import homeProducts, {HomeProductsType} from './products';

export interface State {
  auth: AuthStateTypes;
  homeProducts: HomeProductsType;
}

export default combineReducers({
  auth: auth,
  homeProducts: homeProducts,
});

export type AppDispatch = typeof store.dispatch;
