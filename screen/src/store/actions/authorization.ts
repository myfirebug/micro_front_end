import {
	MENU,
	MENU_TYPE,
	MENU_STATE,
	STRATEGY,
	STRATEGY_TYPE,
	CLEAR_AUTHORIZATION_TYPE,
	RESIDENCES,
	UPDATE_CURRENT_TABKEY,
	UPDATE_CURRENT_TABKEY_TYPE
} from '../actionType';
import { Dispatch } from 'redux';
import { IResult } from '@service/fetch';
import Ajax from '@service/index';
import asession from '@src/utils/session-storage';

// 获取菜单接口类型
export interface IMenuAction {
	type: MENU_TYPE;
	datas: MENU_STATE;
}

// 获取策略
export interface IStrategyAction {
	type: STRATEGY_TYPE;
	key: string;
}

// 更新菜单选中项
export interface IUpdateCurrentTabKeyAction {
	type: UPDATE_CURRENT_TABKEY_TYPE;
	key: string;
}

// 清除authorization数据
export interface IClearAction {
	type: CLEAR_AUTHORIZATION_TYPE;
}

// 定义 ModifyMenuAction 类型
export type ModifyMenuAction =
	| IMenuAction
	| IStrategyAction
	| IClearAction
	| IUpdateCurrentTabKeyAction;

// 获取菜单action
const actionMenu = (datas: MENU_STATE): IMenuAction => ({
	type: MENU,
	datas: datas
});

// 获取策略 action
const actionStrategy = (key: string): IStrategyAction => ({
	type: STRATEGY,
	key
});

// 更新当前选中项 action
const actionUpdateCurrentTabKey = (
	key: string
): IUpdateCurrentTabKeyAction => ({
	type: UPDATE_CURRENT_TABKEY,
	key
});

// 更新菜单方法
export const getMenu =
	(datas?: MENU_STATE, callback?: Function) =>
	(dispatch: Dispatch, getState: Function) => {
		const state = getState();

		if (datas) {
			dispatch(actionMenu(datas));
		} else {
			if (
				state &&
				state.authorization &&
				state.authorization.menu &&
				state.authorization.menu.length
			) {
				return false;
			}
			const memus: MENU_STATE = [
				{
					isMemu: 1,
					resUrl: '/home',
					components: 'home',
					resIcon: 'e670',
					resTitle: '首页',
					status: 0,
					subResource: []
				},
				{
					isMemu: 2,
					resUrl: '/report',
					components: '',
					resIcon: 'e670',
					resTitle: '报表设计',
					status: 0,
					subResource: [
						{
							isMemu: 1,
							resUrl: '/report/big-screen',
							components: 'report/big-screen',
							resIcon: '',
							resTitle: '报表管理',
							status: 0,
							subResource: []
						}
					]
				}
			];
			dispatch(actionMenu(memus));
		}
	};

// 更新当前选中的tab
export const updateCurrentTabKey = (key?: string) => (dispatch: Dispatch) => {
	if (key) {
		dispatch(actionUpdateCurrentTabKey(key));
	}
};

// 获取策略
export const getStrategy = (key: string) => (dispatch: Dispatch) => {
	dispatch(actionStrategy(key));
};
