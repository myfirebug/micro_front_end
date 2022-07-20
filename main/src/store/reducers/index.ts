import { combineReducers } from 'redux';
import { counter } from './counter';
import { authApps } from './auth-apps';
import { authorization } from './authorization';
export default combineReducers({
	counter,
	authApps,
	authorization
});
