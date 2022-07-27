import {
	LARGE_SCREEN,
	LARGE_SCREEN_TYPE,
	MODIFY_SCREEN,
	MODIFY_SCREEN_TYPE,
	ADD_LARGESCREEN_PAGE,
	ADD_LARGESCREEN_PAGE_TYPE,
	DEL_LARGESCREEN_PAGE,
	DEL_LARGESCREEN_PAGE_TYPE,
	MODIFY_LARGESCREEN_PAGE,
	MODIFY_LARGESCREEN_PAGE_TYPE,
	ADD_LARGESCREEN_ELEMENT,
	ADD_LARGESCREEN_ELEMENT_TYPE,
	DEL_LARGESCREEN_ELEMENT,
	DEL_LARGESCREEN_ELEMENT_TYPE,
	MODIFY_LARGESCREEN_ELEMENT,
	MODIFY_LARGESCREEN_ELEMENT_TYPE,
	UNDO_LARGESCREEN,
	UNDO_LARGESCREEN_TYPE,
	REDO_LARGESCREEN,
	REDO_LARGESCREEN_TYPE,
	IPage,
	IScreen
} from '../actionType';
import { Dispatch } from 'redux';

// 获取大屏页面数据
export interface ILargeScreenAction {
	type: LARGE_SCREEN_TYPE;
	datas: IPage[];
}

// 修改屏幕数据
export interface IModifyScreenAction {
	type: MODIFY_SCREEN_TYPE;
	datas: IScreen;
}

// 添加页面
export interface IAddLargeScreenPageAction {
	type: ADD_LARGESCREEN_PAGE_TYPE;
	data: IPage;
}

// 删除页面
export interface IDelLargeScreenPageAction {
	type: DEL_LARGESCREEN_PAGE_TYPE;
	id: string;
}

// 修改页面
export interface IModifyLargeScreenPageAction {
	type: MODIFY_LARGESCREEN_PAGE_TYPE;
	id: string;
}

// 添加元素
export interface IAddLargeScreenElementAction {
	type: ADD_LARGESCREEN_ELEMENT_TYPE;
	data: IPage;
}

// 删除元素
export interface IDelLargeScreenElementAction {
	type: DEL_LARGESCREEN_ELEMENT_TYPE;
	id: string;
}

// 修改元素
export interface IModifyLargeScreenElementAction {
	type: MODIFY_LARGESCREEN_ELEMENT_TYPE;
	id: string;
}

// 撤销
export interface IUndoLargeScreenAction {
	type: UNDO_LARGESCREEN_TYPE;
}

// 恢复
export interface IRedoLargeScreenAction {
	type: REDO_LARGESCREEN_TYPE;
}

// 定义 ModifyAction 类型
export type ModifyAction =
	| ILargeScreenAction
	| IAddLargeScreenPageAction
	| IDelLargeScreenPageAction
	| IModifyLargeScreenPageAction
	| IAddLargeScreenElementAction
	| IDelLargeScreenElementAction
	| IModifyLargeScreenElementAction
	| IUndoLargeScreenAction
	| IRedoLargeScreenAction
	| IModifyScreenAction;

// 获取页面数据的方法
const actionLargeScreen = (datas: IPage[]): ILargeScreenAction => ({
	type: LARGE_SCREEN,
	datas
});

// 新增页面数据的方法
const actionAddLargeScreenPage = (data: IPage): IAddLargeScreenPageAction => ({
	type: ADD_LARGESCREEN_PAGE,
	data
});

// 删除页面数据的方法
const actionDelLargeScreenPage = (id: string): IDelLargeScreenPageAction => ({
	type: DEL_LARGESCREEN_PAGE,
	id
});

// 修改页面数据的方法
const actionModifyLargeScreenPage = (
	id: string
): IModifyLargeScreenPageAction => ({
	type: MODIFY_LARGESCREEN_PAGE,
	id
});

// 新增元素数据的方法
const actionAddLargeScreenElement = (
	data: IPage
): IAddLargeScreenElementAction => ({
	type: ADD_LARGESCREEN_ELEMENT,
	data
});

// 删除元素数据的方法
const actionDelLargeScreenElement = (
	id: string
): IDelLargeScreenElementAction => ({
	type: DEL_LARGESCREEN_ELEMENT,
	id
});

// 修改元素数据的方法
const actionModifyLargeScreenElement = (
	id: string
): IModifyLargeScreenElementAction => ({
	type: MODIFY_LARGESCREEN_ELEMENT,
	id
});

// 撤销元素数据的方法
const actionUndoLargeScreen = (): IUndoLargeScreenAction => ({
	type: UNDO_LARGESCREEN
});

// 恢复元素数据的方法
const actionRedoLargeScreen = (): IRedoLargeScreenAction => ({
	type: REDO_LARGESCREEN
});

// 修改屏幕数据的方法
const actionModifyScreen = (datas: IScreen): IModifyScreenAction => ({
	type: MODIFY_SCREEN,
	datas
});

// 获取当前项目所有页面
export const getLargeScreenPages = (datas: IPage[]) => (dispatch: Dispatch) => {
	dispatch(actionLargeScreen(datas));
};

// 新增页面数据
export const addLargeScreenPage = (data: IPage) => (dispatch: Dispatch) => {
	dispatch(actionAddLargeScreenPage(data));
};

// 删除页面数据
export const delLargeScreenPage = (id: string) => (dispatch: Dispatch) => {
	dispatch(actionDelLargeScreenPage(id));
};

// 修改页面数据
export const modifyLargeScreenPage = (id: string) => (dispatch: Dispatch) => {
	dispatch(actionModifyLargeScreenPage(id));
};

// 新增元素数据
export const addLargeScreenElement = (data: IPage) => (dispatch: Dispatch) => {
	dispatch(actionAddLargeScreenElement(data));
};

// 删除元素数据
export const delLargeScreenElement = (id: string) => (dispatch: Dispatch) => {
	dispatch(actionDelLargeScreenElement(id));
};

// 修改元素数据
export const modifyLargeScreenElement =
	(id: string) => (dispatch: Dispatch) => {
		dispatch(actionModifyLargeScreenElement(id));
	};

// 撤销元素数据
export const undoLargeScreen = () => (dispatch: Dispatch) => {
	dispatch(actionUndoLargeScreen());
};

// 恢复元素数据
export const redoLargeScreen = () => (dispatch: Dispatch) => {
	dispatch(actionRedoLargeScreen());
};

// 修改屏幕数据
export const modifyScreen = (datas: IScreen) => (dispatch: Dispatch) => {
	dispatch(actionModifyScreen(datas));
};
