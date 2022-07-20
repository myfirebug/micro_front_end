import { ModifyAction } from '../actions/auth-apps';
import { AUTHAPPS, IAuthappItem } from '../actionType';

// 处理并返回 state
export const authApps = (
	state: IAuthappItem[] = [],
	action: ModifyAction
): IAuthappItem[] => {
	switch (action.type) {
		case AUTHAPPS:
			return action.data;
		default:
			return state;
	}
};
