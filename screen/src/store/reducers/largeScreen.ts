import { ModifyAction } from '../actions/largeScreen';
import {
	LARGE_SCREEN,
	ADD_LARGESCREEN_PAGE,
	DEL_LARGESCREEN_PAGE,
	MODIFY_LARGESCREEN_PAGE,
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
	breadCrumbs: [],
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
		case ADD_LARGESCREEN_PAGE:
			return state;
		case DEL_LARGESCREEN_PAGE:
			return state;
		case MODIFY_LARGESCREEN_PAGE:
			return state;
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
