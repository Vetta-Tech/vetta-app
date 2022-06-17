import {combineReducers} from 'redux';
import {store} from '../../../App';
import auth, {AuthStateTypes} from './auth';
import categories, {CategoryTypes} from './categories';
import products, {HomeProductsType} from './products';
import brands, {SupplierTypes} from './supplier';

export interface State {
  auth: AuthStateTypes;
  products: HomeProductsType;
  categories: CategoryTypes;
  brands: SupplierTypes;
}

export default combineReducers({
  auth: auth,
  products: products,
  categories: categories,
  brands: brands,
});

export type AppDispatch = typeof store.dispatch;
