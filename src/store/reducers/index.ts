import {combineReducers} from 'redux';
import {store} from '../../../App';
import auth, {AuthStateTypes} from './auth';

export interface State {
  auth: AuthStateTypes;
}

export default combineReducers({
  auth: auth,
});

export type AppDispatch = typeof store.dispatch;
