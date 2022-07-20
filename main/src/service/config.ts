import { IAnyObject } from '@src/types';

interface IConfig {
	[propName: string]: IAnyObject;
}

const config: IConfig = {
	// 开发
	development: {
		default: 'http://172.19.20.12:9905'
	},
	// 测试
	test: {
		default: 'http://172.19.20.12:9905'
	},
	// 正式
	production: {
		default: 'http://192.168.200.7:9905'
	}
};

export default config;
