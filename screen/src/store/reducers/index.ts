import { combineReducers } from 'redux';
import { authorization } from './authorization';
import { counter } from './counter';
import { userInfo } from './userInfo';
import { largeScreen } from './largeScreen';
export default combineReducers({
	counter,
	authorization,
	userInfo,
	largeScreen
});
