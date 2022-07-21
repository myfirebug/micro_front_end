import { AUTHAPPS, AUTHAPPS_TYPE, IAuthappItem } from '../actionType';
import { Dispatch } from 'redux';

// 获取平台
export interface IAuthAppsAction {
	type: AUTHAPPS_TYPE;
	data: IAuthappItem[];
}

// 定义 ModifyAction 类型，包含 IAuthAppsAction
export type ModifyAction = IAuthAppsAction;

// 获取平台数据的方法
const actionAuthApps = (data: IAuthappItem[]): IAuthAppsAction => ({
	type: AUTHAPPS,
	data
});

// 获取平台
export const getAuthApps = (callback: Function) => (dispatch: Dispatch) => {
	setTimeout(() => {
		const datas: IAuthappItem[] = [
			{
				appCode: 'screen',
				appTitle: '大屏管理系统',
				xdid: 1
			},
			{
				appCode: 'survey',
				appTitle: '调查管理系统',
				xdid: 2
			}
		];
		dispatch(actionAuthApps(datas));
		callback && callback(datas);
	}, 1000);
};
