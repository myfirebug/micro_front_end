import React, {
  FC, useState
} from 'react'
import { Tooltip } from 'antd'
import {
  SaveOutlined,
  EyeOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  CloseOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons'
// 获取组件分类
import { elements } from '@src/elements'
// 所有组件地址
import { components } from '@src/elements'
// 尺子
import Ruler from './components/ruler'

import './index.scss'
interface IDisignProps {
  drawer: any;
  setDrawer: React.Dispatch<any>
}

const Disign: FC<IDisignProps> = ({
  drawer,
  setDrawer
}) => {

  const [eles, setEles] = useState([{
    components: 'widget-text'
  }, {
    components: 'widget-text'
  }, {
    components: 'widget-text'
  }, {
    components: 'widget-text'
  }])

  return (
    <div className='app-screen-disign'>
      {/* 头部 */}
      <div className='app-screen-disign__header'>
        {/* elements start */}
        <ul className="app-screen-disign__header--left">
          {
            elements.map((item: any, index: number) => (
              <li key={item.type}>
                {item.icon}
                <p>{item.name}</p>
                <div className="elements"></div>
              </li>
            ))
          }
        </ul>
        {/* elements end */}
        <ul className='app-screen-disign__header--center'>
          <li>
            <Tooltip title="保存(ctrl+s)" placement="bottom">
              <SaveOutlined />
              <p>保存</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="预览(ctrl+p)" placement="bottom">
              <EyeOutlined />
              <p>预览</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="撤销(ctrl+z)" placement="bottom">
              <RotateLeftOutlined />
              <p>撤销</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="恢复(ctrl+shift+z)" placement="bottom">
              <RotateRightOutlined />
              <p>恢复</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="上移(↑)" placement="bottom">
              <ArrowUpOutlined />
              <p>上移</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="下移(↓)" placement="bottom">
              <ArrowDownOutlined />
              <p>下移</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="左移(←)" placement="bottom">
              <ArrowLeftOutlined />
              <p>左移</p>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="右移(→)" placement="bottom">
              <ArrowRightOutlined />
              <p>右移</p>
            </Tooltip>
          </li>
        </ul>
        <ul className="app-screen-disign__header--right">
          <li onClick={() => setDrawer((state: any) => ({
            ...state,
            visible: false
          }))}><CloseOutlined /></li>
        </ul>
      </div>
      {/* 内容区 */}
      <div className='app-screen-disign__body'>
        <div className='app-screen-disign__body--left'>
          <div className='header'>图层</div>
          <div className='body'>
          </div>
        </div>
        <div className='app-screen-disign__body--center'>
          <Ruler />
          <div>
            {
              eles.map((item: any, index: number) => {
                if (components[item.components]) {
                  const Widget = components[item.components]
                  return (
                    <div className='app-widget__wrapper' key={index}>
                      <Widget />
                    </div>
                  )
                }
              })
            }

          </div>
          <svg xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            id="canvas">
            <defs>
              <pattern
                patternUnits="userSpaceOnUse"
                id="p1"
                x="0"
                y="0"
                width="10"
                height="10"
              >
                <rect
                  x="0"
                  y="0"
                  stroke="rgba(0,0,0,.8)"
                  fill="none"
                  width="10.5"
                  height="10.5"
                ></rect>
              </pattern>
            </defs>
            <rect id="wrapper" x="0" y="0" fill="url(#p1)" width="100%" height="100%"></rect>
          </svg>
        </div>
        <div className='app-screen-disign__body--right'>
          <div className='header'>页面属性</div>
          <div className='body'></div>
        </div>
      </div>
    </div>
  )
}
export default Disign