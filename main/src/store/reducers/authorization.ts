/* eslint-disable */
import { ModifyMenuAction } from '../actions/authorization';
import { modifyResUrl } from '@src/utils/tools';
import { IAuthorization, MENU } from '../actionType';
import { routePrefix } from '@utils/tools';
import session from '@src/utils/session-storage';

const initialState = {
	menu: [],
	common: [],
	other: []
};

// 处理并返回 state
export const authorization = (
	state: IAuthorization = initialState,
	action: ModifyMenuAction
): IAuthorization => {
	switch (action.type) {
		case MENU:
			return {
				menu: [
					...modifyResUrl(
						JSON.parse(JSON.stringify(action.other)),
						`${routePrefix}/${session.getItem('appCode')}`
					),
					...modifyResUrl(
						JSON.parse(JSON.stringify(action.common)),
						`${routePrefix}/public`
					)
				],
				common: action.common,
				other: action.other
			};
		default:
			return state;
	}
};
