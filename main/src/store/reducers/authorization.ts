/* eslint-disable */
import { ModifyMenuAction } from '../actions/authorization';
import { IAuthorization, MENU } from '../actionType';

const initialState = {
	menu: [],
	data: []
};

// 处理并返回 state
export const authorization = (
	state: IAuthorization = initialState,
	action: ModifyMenuAction
): IAuthorization => {
	switch (action.type) {
		case MENU:
			return {
				menu: action.data,
				data: action.data
			};
		default:
			return state;
	}
};
