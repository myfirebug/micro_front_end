import { ModifyAction } from '../actions/userInfo';
import {
	USERINFO,
	USERINFO_STATE,
	UPDATE_USERINFO,
	CLEAR_USERINFO
} from '../actionType';

const initialState = {
	insUserRoles: []
};

// 处理并返回 state
export const userInfo = (
	state: USERINFO_STATE = initialState,
	action: ModifyAction
): USERINFO_STATE => {
	switch (action.type) {
		case USERINFO:
			return action.data;
		case UPDATE_USERINFO:
			return {
				...state,
				...action.data
			};
		case CLEAR_USERINFO:
			return initialState;
		default:
			return state;
	}
};
