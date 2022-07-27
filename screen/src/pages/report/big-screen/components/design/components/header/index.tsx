import React, {
  FC
} from 'react'
import { message, Tooltip } from 'antd'
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
// 配置文件
import { widgetConfigure } from '@src/widget/tools'
// 获取组件分类
import { componentsClassify } from '@src/widget'
import { guid } from '@src/utils/tools'
import './index.scss'

interface IDesignHeaderProps {
  drawer: any;
  setDrawer: React.Dispatch<any>;
  addLargeScreenElement: (data: any) => void;
  currentPageId?: string;
}

const DesignHeader: FC<IDesignHeaderProps> = ({
  drawer,
  setDrawer,
  addLargeScreenElement,
  currentPageId
}) => {
  // 向页面添加组件
  const addElement = (code: string) => {
    if (!currentPageId) {
      message.error('请先添加页面哦')
      return
    }
    const index = widgetConfigure.findIndex(item => item.code === code)
    if (index !== -1) {
      addLargeScreenElement({
        id: guid(),
        ...widgetConfigure[index]
      })
    }
  }

  return (
    <div className='app-screen-disign__header'>
      {/* elements start */}
      <ul className="app-screen-disign__header--left">
        {
          componentsClassify.map((item: any, index: number) => (
            <li
              onClick={() => {
                if (item.widgetName) {
                  addElement(item.widgetName)
                }
              }}
              key={item.type}>
              {item.icon}
              <p>{item.name}</p>
              {
                item.data ? <div className="elements"></div> : ''
              }
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
  )
}

export default DesignHeader