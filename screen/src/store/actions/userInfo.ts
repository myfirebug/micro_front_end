import {
	USERINFO_STATE,
	USERINFO,
	USERINFO_TYPE,
	UPDATE_USERINFO,
	UPDATE_USERINFO_TYPE
} from '../actionType';
import { Dispatch } from 'redux';
import { IAnyObject } from '@src/types';
import Ajax from '@src/service';

// 用户信息的接口类型
export interface IUserInfoAction {
	type: USERINFO_TYPE;
	data: USERINFO_STATE;
}
// 修改用户信息的接口类型
export interface IUpdateUserInfoAction {
	type: UPDATE_USERINFO_TYPE;
	data: IAnyObject;
}
// 定义 ModifyAction 类型
export type ModifyAction = IUserInfoAction | IUpdateUserInfoAction;

// 获取用户信息action
const actionUserInfo = (data: USERINFO_STATE): IUserInfoAction => ({
	type: USERINFO,
	data: data
});
// 更新用户信息action
const actionUpdateUserInfo = (data: IAnyObject): IUpdateUserInfoAction => ({
	type: UPDATE_USERINFO,
	data: data
});
// 获取用户信息方法
export const getUserInfo = () => (dispatch: Dispatch) => {
	Ajax.getAccountInfo().then((res: any) => {
		if (res.success) {
			dispatch(actionUserInfo(res.data));
		}
	});
};
// 更新用户信息方法
export const updateUserInfo = (data: IAnyObject) => (dispatch: Dispatch) => {
	dispatch(actionUpdateUserInfo(data));
};
