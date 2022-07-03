import axios from '../../api/axios';
import {ProfileActionTypes} from '../actionTypes/profile';
import {ProfileAction} from '../actions/profile';
import {Dispatch} from 'redux';
import Toast from 'react-native-toast-message';

export const createFeedBack =
  (feedback: string) => async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({
      type: ProfileActionTypes.CREATE_FEEDBACK_START,
    });

    try {
      const response = await axios.post('user/feedback-create', {
        feedback,
      });

      dispatch({
        type: ProfileActionTypes.CREATE_FEEDBACK_SUCCESS,
      });
      Toast.show({
        type: 'customSuccess',
        text1: 'Thanks for your feedback',
        position: 'top',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'top',
        });
        dispatch({
          type: ProfileActionTypes.CREATE_FEEDBACK_FAILD,
          error: 'Something went wrong',
        });
      }
    }
  };
