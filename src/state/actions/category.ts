import {CategoryTypes} from '../actionTypes/category';
import {CategoryProps} from '../interfaces/category';

interface CategoryFetchStart {
  type: CategoryTypes.FETCH_ALL_CATEGORY_START;
}

interface CategoryFetchSuccess {
  type: CategoryTypes.FETCH_ALL_CATEGORY_SUCCESS;
  payload: CategoryProps;
}

interface CategoryFetchFaild {
  type: CategoryTypes.FETCH_ALL_CATEGORY_FAILD;
  payload: string;
}

export type CategoryAction =
  | CategoryFetchStart
  | CategoryFetchSuccess
  | CategoryFetchFaild;
