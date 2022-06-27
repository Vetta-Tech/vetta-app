import {UserAddressActionType} from './address';
import {AuthAction} from './auth';
import {CategoryAction} from './category';
import {ProductsAction} from './products';
import {SupplierFetch} from './supplier';

export type AppActionType =
  | UserAddressActionType
  | AuthAction
  | CategoryAction
  | ProductsAction
  | SupplierFetch;
