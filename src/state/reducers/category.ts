import {CategoryTypes} from '../actionTypes/category';

export interface CategoryTypesProps {
  categories: [];
  loading: boolean;
  error: string;
}

const initialState: CategoryTypesProps = {
  categories: [],
  loading: false,
  error: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CategoryTypes.FETCH_ALL_CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case CategoryTypes.FETCH_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case CategoryTypes.FETCH_ALL_CATEGORY_FAILD:
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
