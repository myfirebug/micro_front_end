import { ModifyAction } from '../actions/largeScreen';
import {
	LARGE_SCREEN,
	ADD_LARGESCREEN_PAGE,
	DEL_LARGESCREEN_PAGE,
	MODIFY_LARGESCREEN_PAGE,
	CHANGE_LARGESCREEN_PAGE,
	ADD_LARGESCREEN_ELEMENT,
	DEL_LARGESCREEN_ELEMENT,
	MODIFY_LARGESCREEN_ELEMENT,
	UNDO_LARGESCREEN,
	REDO_LARGESCREEN,
	LARGESCREEN_STATE,
	MODIFY_SCREEN
} from '../actionType';

// 处理并返回 state
const initialState = {
	pages: [],
	pastPage: [],
	futurePage: [],
	currentPage: {},
	currentWidgetId: '',
	screen: {
		width: 1920,
		height: 1080,
		backgroundColor: '',
		title: '大屏',
		description: '描述'
	}
};

export const largeScreen = (
	state: LARGESCREEN_STATE = initialState,
	action: ModifyAction
): LARGESCREEN_STATE => {
	switch (action.type) {
		case LARGE_SCREEN:
			return state;
		case MODIFY_SCREEN:
			return {
				...state,
				screen: {
					...state.screen,
					...action.datas
				}
			};
		// 新增页面
		case ADD_LARGESCREEN_PAGE:
			return {
				...state,
				pages: [...state.pages, action.data],
				currentPage: action.data,
				pastPage: [],
				futurePage: [],
				currentWidgetId: ''
			};
		// 删除页面
		case DEL_LARGESCREEN_PAGE:
			return state;
		// 修改页面
		case MODIFY_LARGESCREEN_PAGE:
			return state;
		// 切换页面
		case CHANGE_LARGESCREEN_PAGE: {
			const index = state.pages.findIndex((item) => item.id === action.id);
			return {
				...state,
				pages: state.pages.map((item) => {
					if (item.id === state.currentPage.id) {
						return {
							...state.currentPage
						};
					}
					return item;
				}),
				currentPage: {
					...state.pages[index]
				},
				pastPage: [],
				futurePage: [],
				currentWidgetId: ''
			};
		}

		case ADD_LARGESCREEN_ELEMENT:
			return state;
		case DEL_LARGESCREEN_ELEMENT:
			return state;
		case MODIFY_LARGESCREEN_ELEMENT:
			return state;
		case UNDO_LARGESCREEN:
			return state;
		case REDO_LARGESCREEN:
			return state;
		default:
			return state;
	}
};
