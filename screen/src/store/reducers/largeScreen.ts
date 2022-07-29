import { copyFile } from 'fs';
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
	CHANGE_LARGESCREEN_ELEMENET,
	UNDO_LARGESCREEN,
	REDO_LARGESCREEN,
	LARGESCREEN_STATE,
	MODIFY_SCREEN,
	IPage,
	IWidget
} from '../actionType';

// 处理并返回 state
const initialState = {
	pages: [],
	pastPage: [],
	futurePage: [],
	currentPage: {} as IPage,
	currentWidgetId: '',
	currentWidget: {} as IWidget,
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
	const copy: LARGESCREEN_STATE = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case LARGE_SCREEN:
			return state;
		case MODIFY_SCREEN:
			return {
				...copy,
				screen: {
					...copy.screen,
					...action.datas
				}
			};
		// 新增页面
		case ADD_LARGESCREEN_PAGE:
			if (copy.currentPage) {
				// 这里首页判断当前currentPage在pages里的下标，然后替换数据
				const currentPageIndex = copy.pages.findIndex(
					(item) => item.id === copy.currentPage.id
				);
				if (currentPageIndex !== -1) {
					copy.pages[currentPageIndex] = { ...copy.currentPage };
				}
			}
			return {
				...copy,
				pages: [...copy.pages, action.data],
				currentPage: action.data,
				pastPage: [],
				futurePage: [],
				currentWidgetId: ''
			};
		// 删除页面
		case DEL_LARGESCREEN_PAGE:
			return {
				...copy,
				pages: copy.pages.filter((item) => item.id !== action.id)
			};
		// 修改页面
		case MODIFY_LARGESCREEN_PAGE:
			return {
				...copy,
				pages: copy.pages.map((item) => {
					if (item.id === action.id) {
						return {
							...action.data
						};
					}
					return item;
				})
			};
		// 切换页面
		case CHANGE_LARGESCREEN_PAGE: {
			// 这里首页判断当前currentPage在pages里的下标，然后替换数据
			const currentPageIndex = copy.pages.findIndex(
				(item) => item.id === copy.currentPage.id
			);
			if (currentPageIndex !== -1) {
				copy.pages[currentPageIndex] = { ...copy.currentPage };
			}

			// 这里找到需要修改的id的下标
			const index = copy.pages.findIndex((item) => item.id === action.id);
			return {
				...copy,
				pages: copy.pages.map((item) => {
					if (item.id === copy.currentPage.id) {
						return {
							...copy.currentPage
						};
					}
					return item;
				}),
				currentPage: {
					...copy.pages[index]
				},
				pastPage: [],
				futurePage: [],
				currentWidgetId: ''
			};
		}
		// 添加元素
		case ADD_LARGESCREEN_ELEMENT: {
			const currentPage: IPage = { ...copy.currentPage };
			currentPage.widgets = currentPage.widgets
				? [...currentPage.widgets, action.data]
				: [];
			return {
				...copy,
				pastPage: [...copy.pastPage, currentPage],
				currentPage: currentPage,
				currentWidgetId: action.data.id,
				currentWidget: action.data
			};
		}
		// 删除元素
		case DEL_LARGESCREEN_ELEMENT:
			return copy;
		// 修改元素
		case MODIFY_LARGESCREEN_ELEMENT: {
			const currentPage: IPage = copy.currentPage;
			currentPage.widgets = currentPage.widgets.map((item) => {
				if (item.id === action.id) {
					return action.data;
				}
				return item;
			});
			return {
				...copy,
				pastPage: [...copy.pastPage, currentPage],
				currentPage: currentPage,
				currentWidget: action.data
			};
		}
		// 切换元素
		case CHANGE_LARGESCREEN_ELEMENET: {
			const currentPage: IPage = { ...copy.currentPage };
			const index = currentPage.widgets.findIndex(
				(item) => item.id === action.id
			);
			if (index !== -1) {
				return {
					...copy,
					currentWidgetId: action.id,
					currentWidget: currentPage.widgets[index]
				};
			}
			return copy;
		}
		// 撤销
		case UNDO_LARGESCREEN: {
			let pastPage: IPage[] = [...state.pastPage];
			let futurePage: IPage[] = [...state.futurePage];
			if (pastPage.length) {
				let last: IPage = pastPage.pop() as IPage;
				futurePage.unshift({ ...copy.currentPage });
				return {
					...copy,
					pastPage: pastPage,
					futurePage: futurePage,
					currentPage: last,
					currentWidgetId: '',
					currentWidget: {} as IWidget
				};
			}
			return {
				...copy
			};
		}
		// 恢复
		case REDO_LARGESCREEN: {
			let pastPage: IPage[] = [...state.pastPage];
			let futurePage: IPage[] = [...state.futurePage];
			if (futurePage.length) {
				let first: IPage = futurePage.shift() as IPage;
				pastPage.push({ ...copy.currentPage });
				return {
					...copy,
					pastPage: pastPage,
					futurePage: futurePage,
					currentPage: first,
					currentWidgetId: '',
					currentWidget: {} as IWidget
				};
			}
			return {
				...copy
			};
		}
		default:
			return state;
	}
};
