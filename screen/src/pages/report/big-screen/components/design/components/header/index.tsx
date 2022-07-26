import React, {
  FC
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
import { componentsClassify } from '@src/elements'
import './index.scss'

interface IDesignHeaderProps {
  drawer: any;
  setDrawer: React.Dispatch<any>
}

const DesignHeader: FC<IDesignHeaderProps> = ({
  drawer,
  setDrawer
}) => {
  return (
    <div className='app-screen-disign__header'>
      {/* elements start */}
      <ul className="app-screen-disign__header--left">
        {
          componentsClassify.map((item: any, index: number) => (
            <li key={item.type}>
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