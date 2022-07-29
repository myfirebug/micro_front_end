import React, {
  FC, useCallback, useEffect
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
import { IPage } from '@src/store/actionType'

interface IDesignHeaderProps {
  drawer: any;
  setDrawer: React.Dispatch<any>;
  addLargeScreenElement: (data: any) => void;
  pastPage: IPage[];
  futurePage: IPage[];
  currentWidgetId?: string;
  currentPageId?: string;
  undoLargeScreen: () => void;
  redoLargeScreen: () => void;
}

const DesignHeader: FC<IDesignHeaderProps> = ({
  setDrawer,
  addLargeScreenElement,
  currentPageId,
  pastPage,
  futurePage,
  currentWidgetId,
  undoLargeScreen,
  redoLargeScreen
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
  // 撤销
  const undoHander = useCallback(() => {
    if (pastPage.length) {
      undoLargeScreen()
    }
  }, [pastPage.length])
  // 恢复
  const redoHandler = useCallback(() => {
    if (futurePage.length) {
      redoLargeScreen()
    }
  }, [futurePage.length])

  useEffect(() => {
    const keyupHander = (e: any) => {
      if (e.ctrlKey && e.keyCode === 90) {
        if (e.altKey) {
          // 恢复
          redoHandler()
        } else {
          // 撤销
          undoHander()
        }
      }
    }
    document.addEventListener('keyup', keyupHander)

    return () => {
      document.removeEventListener('keyup', keyupHander)
    }
  }, [undoHander, redoHandler])

  return (
    <div className='app-screen-disign__header'>
      {/* elements start */}
      <ul className="app-screen-disign__header--left">
        {
          componentsClassify.map((item: any, index: number) => (
            <li
              className={`${!currentPageId ? 'is-disabled' : ''}`}
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
        <li className={`${!currentPageId ? 'is-disabled' : ''}`}>
          <Tooltip title="保存(ctrl+s)" placement="bottom">
            <SaveOutlined />
            <p>保存</p>
          </Tooltip>
        </li>
        <li className={`${!currentPageId ? 'is-disabled' : ''}`}>
          <Tooltip title="预览(ctrl+p)" placement="bottom">
            <EyeOutlined />
            <p>预览</p>
          </Tooltip>
        </li>
        <li
          onClick={undoHander}
          className={`${!pastPage.length ? 'is-disabled' : ''}`}>
          <Tooltip title="撤销(ctrl+z)" placement="bottom">
            <RotateLeftOutlined />
            <p>撤销</p>
          </Tooltip>
        </li>
        <li
          onClick={redoHandler}
          className={`${!futurePage.length ? 'is-disabled' : ''}`}>
          <Tooltip title="恢复(ctrl+alt+z)" placement="bottom">
            <RotateRightOutlined />
            <p>恢复</p>
          </Tooltip>
        </li>
        <li className={`${!currentWidgetId ? 'is-disabled' : ''}`}>
          <Tooltip title="上移(↑)" placement="bottom">
            <ArrowUpOutlined />
            <p>上移</p>
          </Tooltip>
        </li>
        <li className={`${!currentWidgetId ? 'is-disabled' : ''}`}>
          <Tooltip title="下移(↓)" placement="bottom">
            <ArrowDownOutlined />
            <p>下移</p>
          </Tooltip>
        </li>
        <li className={`${!currentWidgetId ? 'is-disabled' : ''}`}>
          <Tooltip title="左移(←)" placement="bottom">
            <ArrowLeftOutlined />
            <p>左移</p>
          </Tooltip>
        </li>
        <li className={`${!currentWidgetId ? 'is-disabled' : ''}`}>
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