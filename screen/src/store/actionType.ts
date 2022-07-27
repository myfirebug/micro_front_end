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

// 面包屑
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

// 页面接口
export interface IPage {
	id?: string;
	name?: string;
	elements?: any[];
}

export interface IScreen {
	width: number | string;
	height: number | string;
	title: string;
	description: string;
	backgroundColor: string;
}
/**
 * 所有页面
 * 注意：
 * 1.当前切换页面时，pastPage, futurePage重置[], currentPage的数据等于当前选中的页面的数据，currentWidgetId需要重置
 * 2.只有当前页面才会有撤销和恢复
 */
export type LARGESCREEN_STATE = {
	// 当前项目所有页面
	pages: IPage[];
	// 撤销
	pastPage: IPage[];
	// 恢复
	futurePage: IPage[];
	// 当前页面
	currentPage: IPage;
	// 选中组件ID
	currentWidgetId: string;
	screen: IScreen;
};
// 获取大屏数据
export const LARGE_SCREEN = 'LARGE_SCREEN';
export type LARGE_SCREEN_TYPE = typeof LARGE_SCREEN;
// 修改屏幕数据
export const MODIFY_SCREEN = 'MODIFY_SCREEN';
export type MODIFY_SCREEN_TYPE = typeof MODIFY_SCREEN;
// 添加页面
export const ADD_LARGESCREEN_PAGE = 'ADD_LARGESCREEN_PAGE';
export type ADD_LARGESCREEN_PAGE_TYPE = typeof ADD_LARGESCREEN_PAGE;
// 删除页面
export const DEL_LARGESCREEN_PAGE = 'DEL_LARGESCREEN_PAGE';
export type DEL_LARGESCREEN_PAGE_TYPE = typeof DEL_LARGESCREEN_PAGE;
// 切换页面
export const CHANGE_LARGESCREEN_PAGE = 'CHANGE_LARGESCREEN_PAGE';
export type CHANGE_LARGESCREEN_PAGE_TYPE = typeof CHANGE_LARGESCREEN_PAGE;
// 修改页面
export const MODIFY_LARGESCREEN_PAGE = 'MODIFY_LARGESCREEN_PAGE';
export type MODIFY_LARGESCREEN_PAGE_TYPE = typeof MODIFY_LARGESCREEN_PAGE;
// 添加widget
export const ADD_LARGESCREEN_ELEMENT = 'ADD_LARGESCREEN_ELEMENT';
export type ADD_LARGESCREEN_ELEMENT_TYPE = typeof ADD_LARGESCREEN_ELEMENT;
// 删除widget
export const DEL_LARGESCREEN_ELEMENT = 'DEL_LARGESCREEN_ELEMENT';
export type DEL_LARGESCREEN_ELEMENT_TYPE = typeof DEL_LARGESCREEN_ELEMENT;
// 修改widget
export const MODIFY_LARGESCREEN_ELEMENT = 'MODIFY_LARGESCREEN_ELEMENT';
export type MODIFY_LARGESCREEN_ELEMENT_TYPE = typeof MODIFY_LARGESCREEN_ELEMENT;
// 撤销
export const UNDO_LARGESCREEN = 'UNDO_LARGESCREEN';
export type UNDO_LARGESCREEN_TYPE = typeof UNDO_LARGESCREEN;
// 恢复
export const REDO_LARGESCREEN = 'REDO_LARGESCREEN';
export type REDO_LARGESCREEN_TYPE = typeof REDO_LARGESCREEN;

// 所有的数据的数据类型, 注意这里每加一个state模块都必须在这里进行申明
export type ALL_STATE = {
	counter: COUNTER_STATE;
	authorization: IAuthorization;
	userInfo: IUserInfo;
	largeScreen: LARGESCREEN_STATE;
};

// 定义省市区
export const RESIDENCES = 'RESIDENCES';
export type RESIDENCES_TYPE = typeof RESIDENCES;
