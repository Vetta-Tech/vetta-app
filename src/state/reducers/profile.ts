import {ProfileState} from '../interfaces/profile';

import {ProfileAction} from '../actions/profile';
import {ProfileActionTypes} from '../actionTypes/profile';

const Initial_state: ProfileState = {
  loading: false,
  error: '',
  feedback_success: false,
};

const reducer = (
  state = Initial_state,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case ProfileActionTypes.CREATE_FEEDBACK_START:
      return {
        ...state,
        loading: true,
      };
    case ProfileActionTypes.CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedback_success: true,
      };
    case ProfileActionTypes.CREATE_FEEDBACK_FAILD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
