const coordinate = {
	type: 'page',
	label: '坐标',
	configure: [
		{
			type: 'InputNumber',
			label: '左边距',
			name: 'left',
			required: false,
			placeholder: '',
			value: 0
		},
		{
			type: 'InputNumber',
			label: '上边距',
			name: 'top',
			required: false,
			placeholder: '',
			value: 0
		},
		{
			type: 'InputNumber',
			label: '宽度',
			name: 'width',
			required: false,
			placeholder: '',
			value: 600
		},
		{
			type: 'InputNumber',
			label: '高度',
			name: 'height',
			required: false,
			placeholder: '',
			value: 400
		}
	]
};

export default coordinate;
