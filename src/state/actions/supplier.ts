import {BrandsTypes} from '../../utils/types/brandsType';
import {SupplierActiontypes} from '../actionTypes/supplier';

interface FetchSupplierStart {
  type: SupplierActiontypes.FETCH_SUPPLIER_START;
}
interface FetchSupplierSuccess {
  type: SupplierActiontypes.FETCH_SUPPLIER_SUCCESS;
  payload: BrandsTypes;
}
interface FetchSupplierFail {
  type: SupplierActiontypes.FETCH_SUPPLIER_FAILD;
  payload: string;
}
interface FetchSupplierDetailStart {
  type: SupplierActiontypes.FETCH_SUPPLIER_DETAILS_START;
}
interface FetchSupplierStart {
  type: SupplierActiontypes.FETCH_SUPPLIER_START;
}
interface FetchSupplierStart {
  type: SupplierActiontypes.FETCH_SUPPLIER_START;
}
interface FetchSupplierStart {
  type: SupplierActiontypes.FETCH_SUPPLIER_START;
}

export type SupplierFetch =
  | FetchSupplierStart
  | FetchSupplierSuccess
  | FetchSupplierFail;
