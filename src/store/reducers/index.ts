import {combineReducers} from 'redux';
import {store} from '../../../App';
import auth, {AuthStateTypes} from './auth';
import categories, {CategoryTypes} from './categories';
import products, {HomeProductsType} from './products';

export interface State {
  auth: AuthStateTypes;
  products: HomeProductsType;
  categories: CategoryTypes;
}

export default combineReducers({
  auth: auth,
  products: products,
  categories: categories,
});

export type AppDispatch = typeof store.dispatch;
