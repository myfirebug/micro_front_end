import { post, IResult } from './fetch';
import { IAnyObject } from '@src/types';
interface IApi {
	[propNames: string]: (params?: IAnyObject) => Promise<IResult>;
}

const api: IApi = {
	// 登录
	login(params) {
		return post({
			url: 'oauth-service/user/login',
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	},
	// 刷新token
	refreshToken(params) {
		return post({
			url: 'oauth-service/user/refresh',
			data: params,
			loading: true,
			servicePrefix: 'default'
		});
	}
};

export default api;
