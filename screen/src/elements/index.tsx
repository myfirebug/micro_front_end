import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  FontSizeOutlined,
  FileImageOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  TableOutlined
} from '@ant-design/icons'
import './index.scss'

// 组件分类
export const componentsClassify = [{
  type: 'text',
  icon: <FontSizeOutlined />,
  name: '文本',
  widgetName: 'widget-text'
},
{
  type: 'image',
  icon: <FileImageOutlined />,
  name: '图片'
},
{
  type: 'link',
  icon: <LinkOutlined />,
  name: '链接'
},
{
  type: 'date',
  icon: <ClockCircleOutlined />,
  name: '当前时间'
},
{
  type: 'table',
  icon: <TableOutlined />,
  name: '表格'
},
{
  type: 'line',
  icon: <LineChartOutlined />,
  name: '折线图'
},
{
  type: 'bar',
  icon: <BarChartOutlined />,
  name: '柱状图'
},
{
  type: 'pie',
  icon: <PieChartOutlined />,
  name: '饼图'
},
{
  type: 'radar',
  icon: <RadarChartOutlined />,
  name: '雷达图'
}]

// 所有组件地址
const components: any = {
  'widget-text': require('./text').default
}

export default components