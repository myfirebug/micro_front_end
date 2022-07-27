const text = {
    code: 'widget-text',
    type: 'text',
    label: '文本',
    options: {
        // 配置项值
        configureValue: {
            elementName: '文本框',
            elementValue: '文本框',
            fontSize: 26,
            letterSpacing: 0,
            fontWeight: 'normal',
            textAlign: 'center'
        },
        // 基础配置项
        configure: [{
                type: 'Input',
                label: '图层名称',
                name: 'elementName',
                required: false,
                placeholder: ''
            },
            {
                type: 'Input',
                label: '文本内容',
                name: 'elementValue',
                required: false,
                placeholder: ''
            },
            {
                type: 'InputNumber',
                label: '字体大小',
                name: 'fontSize',
                required: false,
                min: 12,
                placeholder: ''
            },
            {
                type: 'InputNumber',
                label: '字体间距',
                name: 'letterSpacing',
                required: false,
                placeholder: ''
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
                ]
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
                ]
            },
            {
                type: 'SketchPicker',
                label: '字体颜色',
                name: 'color',
                required: false,
                placeholder: '请选择字体颜色'
            }
        ],
        // 坐标值
        coordinateValue: {
            left: 0,
            top: 0,
            width: 100,
            height: 40
        }
    }
};

export default text;