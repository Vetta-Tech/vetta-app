import {combineReducers} from 'redux';

import Auth from './reducers/auth';
import Product from './reducers/products';
import Category from './reducers/category';

const reducers = combineReducers({
  product: Product,
  auth: Auth,
  categories: Category,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
