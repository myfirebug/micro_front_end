import { MENU, MENU_TYPE, MENU_STATE } from '../actionType';
import { Dispatch } from 'redux';
import Ajax from '@src/service';
import session from '@src/utils/session-storage';

// 获取菜单接口类型
export interface IMenuAction {
	type: MENU_TYPE;
	data: MENU_STATE;
}

// 定义 ModifyMenuAction 类型
export type ModifyMenuAction = IMenuAction;

// 获取菜单action
const actionMenu = (data: MENU_STATE): IMenuAction => ({
	type: MENU,
	data
});

// 更新菜单方法
/**
 * @param appCode 传入的平台，看是调用好个平台 的API
 * @param callback 方法
 * @returns
 */
export const getMenu =
	(appCode?: string, callback?: Function) => (dispatch: Dispatch) => {
		// 获取菜单树，这里需要获取公共的，跟基本的然后组合
		async function getTree() {
			const { data } = await Ajax.getMenus({
				insSn: session.getItem('insSn'),
				isBase: 0
			});
			dispatch(actionMenu(data));
			callback && callback();
		}
		if (appCode) {
			session.setItem('appCode', appCode);
			getTree();
		}
	};
