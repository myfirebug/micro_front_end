const WidgetText = {
	type: 'text',
	label: '文本',
	configure: [
		{
			type: 'Input',
			label: '图层名称',
			name: 'widgetName',
			required: false,
			placeholder: '',
			value: '文本框'
		},
		{
			type: 'Input',
			label: '文本内容',
			name: 'widgetValue',
			required: false,
			placeholder: '',
			value: '文本框'
		},
		{
			type: 'InputNumber',
			label: '字体大小',
			name: 'fontSize',
			required: false,
			min: 12,
			placeholder: '',
			value: '26'
		},
		{
			type: 'InputNumber',
			label: '字体间距',
			name: 'letterSpacing',
			required: false,
			placeholder: '',
			value: '0'
		},
		{
			type: 'Select',
			label: '文字粗细',
			name: 'fontWeight',
			required: false,
			placeholder: '',
			options: [
				{ code: 'normal', name: '正常' },
				{ code: 'bold', name: '粗体' },
				{ code: 'bolder', name: '特粗体' },
				{ code: 'lighter', name: '细体' }
			],
			value: 'normal'
		},
		{
			type: 'Select',
			label: '对齐方式',
			name: 'textAlign',
			required: false,
			placeholder: '',
			options: [
				{ code: 'center', name: '居中' },
				{ code: 'left', name: '左对齐' },
				{ code: 'right', name: '右对齐' }
			],
			value: 'center'
		}
	]
};

export default WidgetText;
