import { IAnyObject } from '@src/types/index';

// counter state数据类型
export type COUNTER_STATE = number;
// 定义增加 state 类型常量
export const INCREMENT = 'INCREMENT';
export type INCREMENT_TYPE = typeof INCREMENT;

// 定义减少 state 类型常量
export const DECREMENT = 'DECREMENT';
export type DECREMENT_TYPE = typeof DECREMENT;

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

export interface IBreadCrumbsItem {
	path: string;
	name: string;
}

// 路由接口
export interface IRouter {
	component: string;
	icon: string;
	id: number;
	name: string;
	path: string;
}

/**
 * 策略
 */
// authorization 数据类型
export interface IAuthorization {
	menu: MENU_STATE;
	routers: IRouter[];
	currPageTabKey: string;
	strategy: IAnyObject;
	breadCrumbs: IBreadCrumbsItem[];
}

// 获取菜单
export const MENU = 'MENU';
export type MENU_TYPE = typeof MENU;

// 更新当前菜单选中项 currPageTabKey
export const UPDATE_CURRENT_TABKEY = 'UPDATE_CURRENT_TABKEY';
export type UPDATE_CURRENT_TABKEY_TYPE = typeof UPDATE_CURRENT_TABKEY;

// 获取策略
export const STRATEGY = 'STRATEGY';
export type STRATEGY_TYPE = typeof STRATEGY;

// 清除authorization数据
export const CLEAR_AUTHORIZATION = 'CLEAR_AUTHORIZATION';
export type CLEAR_AUTHORIZATION_TYPE = typeof CLEAR_AUTHORIZATION;

export interface IAictionary {
	residences: any;
}
// 所有的数据的数据类型, 注意这里每加一个state模块都必须在这里进行申明
export type ALL_STATE = {
	counter: COUNTER_STATE;
	dictionary: IAictionary;
	authorization: IAuthorization;
	userInfo: IUserInfo;
};

// 定义省市区
export const RESIDENCES = 'RESIDENCES';
export type RESIDENCES_TYPE = typeof RESIDENCES;
