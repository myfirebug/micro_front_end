import { IAnyObject } from '@src/types';

// counter state数据类型
export type COUNTER_STATE = number;
// 定义增加 state 类型常量
export const INCREMENT = 'INCREMENT';
export type INCREMENT_TYPE = typeof INCREMENT;

// 定义减少 state 类型常量
export const DECREMENT = 'DECREMENT';
export type DECREMENT_TYPE = typeof DECREMENT;

// 获取用户平台
export const AUTHAPPS = 'AUTHAPPS';
export type AUTHAPPS_TYPE = typeof AUTHAPPS;

export interface IAuthappItem extends IAnyObject {
	appCode: string;
	appTitle: string;
}

export type AUTHAPPS_STATE = IAuthappItem[];

// 菜单接口
export interface IMenu {
	isMemu: 1 | 2 | 3;
	resUrl: string;
	components: string;
	resIcon: string;
	resTitle: string;
	status: number;
	subResource?: IMenu[];
}
export type MENU_STATE = IMenu[];

/**
 * 策略
 */
// authorization 数据类型
export interface IAuthorization {
	menu: MENU_STATE;
	// 路由
	data: MENU_STATE;
}

// 获取菜单
export const MENU = 'MENU';
export type MENU_TYPE = typeof MENU;

/**
 * 用户信息
 */
// 用户信息里的insInfos接口
export interface IUserInfoItem {
	insSn: string;
	insName: string;
	roleCode: string;
	roleName: string;
	notes: string;
}
// 用户信息接口
export interface IUserInfo extends IAnyObject {
	insUserRoles: IUserInfoItem[];
}
export type USERINFO_STATE = IUserInfo;
// 获取用户信息
export const USERINFO = 'USERINFO';
export type USERINFO_TYPE = typeof USERINFO;
// 清空用户信息
export const CLEAR_USERINFO = 'CLEAR_USERINFO';
export type CLEAR_USERINFO_TYPE = typeof CLEAR_USERINFO;
// 编辑用户信息
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export type UPDATE_USERINFO_TYPE = typeof UPDATE_USERINFO;

// 未读消息数
export const UNREAD = 'UNREAD';
export type UNREAD_TYPE = typeof UNREAD;

// 所有的数据的数据类型, 注意这里每加一个state模块都必须在这里进行申明
export type ALL_STATE = {
	counter: COUNTER_STATE;
	authApps: AUTHAPPS_STATE;
	authorization: IAuthorization;
	userInfo: IUserInfo;
	unread: number;
};
