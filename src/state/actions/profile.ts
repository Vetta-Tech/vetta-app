import {ProfileActionTypes} from '../actionTypes/profile';

interface CreateFeedbackStart {
  type: ProfileActionTypes.CREATE_FEEDBACK_START;
}

interface CreateFeedbackSuccess {
  type: ProfileActionTypes.CREATE_FEEDBACK_SUCCESS;
}

interface CreateFeedbackFaild {
  type: ProfileActionTypes.CREATE_FEEDBACK_FAILD;
  error: string;
}

export type ProfileAction =
  | CreateFeedbackStart
  | CreateFeedbackSuccess
  | CreateFeedbackFaild;
