// 任意类型的object
export interface IAnyObject {
	[propName: string]: any
}
// 默认接口请求
export interface IDefaultConfig {
	url: string
	params?: {
		[propName: string]: any
	}
	loading?: boolean
	servicePrefix?: string
	responseType?: string
	data?: {
		[propName: string]: any
	}
}
