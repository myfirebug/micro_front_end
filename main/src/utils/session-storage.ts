// Storage封装
const STORAGE_KEY = 'PUBLIC';

// 这里为了监听sessionStorage变化能实实拿到数据
const orignalSetItem = localStorage.setItem;
window.sessionStorage.setItem = function (key: string, value: any) {
	const args: any = arguments;
	orignalSetItem.apply(this, args);
	// 这里只监听PUBLIC数据的变化
	if (key === STORAGE_KEY) {
		const event = new CustomEvent('setSessionItemEvent', {
			detail: {
				key: key,
				value: value
			}
		});
		window.dispatchEvent(event);
	}
};

const session = {
	setItem(key: string, value: any, moduleName?: string) {
		if (moduleName) {
			const val = this.getItem(moduleName);
			val[key] = value;
			this.setItem(moduleName, val);
		} else {
			const val = this.getStorage();
			val[key] = value;
			window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
		}
	},
	// 获取某一个模块下面的属性user下面的userName
	getItem(key: string, moduleName?: string) {
		if (moduleName) {
			const val: any = this.getItem(moduleName);
			if (val) return val[key];
		}
		return this.getStorage()[key];
	},
	getStorage() {
		const result = (window as any).sessionStorage.getItem(STORAGE_KEY);
		return result ? JSON.parse(result) : {};
	},
	clear(key: string, moduleName: string) {
		const val = this.getStorage();
		if (moduleName) {
			if (val[moduleName]) return;
			delete val[moduleName][key];
		} else {
			delete val[key];
		}
		window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
	}
};

export default session;
