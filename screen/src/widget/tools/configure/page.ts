const page = {
	type: 'page',
	label: '页面配置',
	configure: [
		{
			type: 'InputNumber',
			label: '屏幕宽度',
			name: 'width',
			required: false,
			placeholder: '请输入屏幕宽度'
		},
		{
			type: 'InputNumber',
			label: '屏幕高度',
			name: 'height',
			required: false,
			placeholder: '请输入屏幕高度'
		},
		{
			type: 'SketchPicker',
			label: '背景颜色',
			name: 'backgroundColor',
			required: false,
			placeholder: '请选择背景颜色'
		},
		{
			type: 'Input',
			label: '标题',
			name: 'title',
			require: false,
			placeholder: '请输入标题'
		},
		{
			type: 'TextArea',
			label: '大屏简介',
			name: 'description',
			required: false,
			placeholder: '请输入大屏简介'
		}
	]
};

export default page;
