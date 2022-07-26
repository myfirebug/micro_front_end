const page = {
	type: 'page',
	label: '页面配置',
	configure: [
		{
			type: 'InputNumber',
			label: '屏幕宽度',
			name: 'width',
			required: false,
			placeholder: 'px',
			value: '1920'
		},
		{
			type: 'InputNumber',
			label: '屏幕高度',
			name: 'height',
			required: false,
			placeholder: 'px',
			value: '1080'
		},
		{
			type: 'SketchPicker',
			label: '背景颜色',
			name: 'backgroundColor',
			required: false,
			placeholder: '',
			value: 'red'
		},
		{
			type: 'Input',
			label: '标题',
			name: 'title',
			require: false,
			placeholder: '',
			value: '大屏'
		},
		{
			type: 'TextArea',
			label: '大屏简介',
			name: 'description',
			required: false,
			placeholder: ''
		}
	]
};

export default page;
