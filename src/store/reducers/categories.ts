import {
  FETCH_ALL_CATEGORY_START,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_FAILD,
} from '../types';

export interface CategoryTypes {
  categories: [];
  loading: boolean;
  error: string;
}

const initialState: CategoryTypes = {
  categories: [],
  loading: false,
  error: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case FETCH_ALL_CATEGORY_FAILD:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
