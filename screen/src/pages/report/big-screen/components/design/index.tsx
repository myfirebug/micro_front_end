import React, {
  FC,
  useEffect,
  useState,
  useRef
} from 'react'
import { ALL_STATE, IPage, IScreen, IWidget } from '@store/actionType'
import { connect } from 'react-redux'
import { Slider } from 'antd'
import {
  getLargeScreenPages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  addLargeScreenElement,
  delLargeScreenElement,
  modifyLargeScreenElement,
  undoLargeScreen,
  redoLargeScreen,
  modifyScreen,
  changeLargeScreenPage
} from '@store/actions/largeScreen'


// 头部
import DesignHeader from './components/header'
// 主题左边
import DesignBodyLeft from './components/left'
// 主题右边
import DesignBodyRight from './components/right'
// 所有组件地址
import components from '@src/widget'
// 尺子
import Ruler from './components/ruler'

import './index.scss'

interface IDisignProps {
  drawer: any;
  setDrawer: React.Dispatch<any>;
  modifyScreen: (datas: any) => void;
  screen: IScreen;
  pages: IPage[];
  addLargeScreenPage: (data: IPage, callback?: Function) => void;
  delLargeScreenPage: (id: string, callback?: Function) => void;
  modifyLargeScreenPage: (id: string, data: IPage, callback?: Function) => void;
  changeLargeScreenPage: (id: string, callback?: Function) => void;
  addLargeScreenElement: (data: any) => void;
  modifyLargeScreenElement: (id: string, data: IWidget, callback?: Function) => void;
  currentPage: IPage;
  currentWidgetId: string;
  currentWidget: IWidget;
  pastPage: IPage[];
  futurePage: IPage[];
  undoLargeScreen: () => void;
  redoLargeScreen: () => void;
}

const Disign: FC<IDisignProps> = ({
  drawer,
  setDrawer,
  modifyScreen,
  screen,
  pages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  changeLargeScreenPage,
  addLargeScreenElement,
  currentPage,
  currentWidgetId,
  currentWidget,
  modifyLargeScreenElement,
  pastPage,
  futurePage,
  undoLargeScreen,
  redoLargeScreen
}) => {

  // 获取装组件的盒子，这里需要获取他的宽度
  const elementsWrapper = useRef<HTMLDivElement>(null)
  const [elementsWrapperAttr, setElementsWrapperAttr] = useState<any>({})
  // 获取放大缩小比例
  const [cale, setCale] = useState(0)
  // 显示隐藏左侧
  const [leftFlag, setLeftFlag] = useState(true)
  // 显示隐藏右侧
  const [rightFlag, setRightFlag] = useState(true)

  // 这里主要设置默认的缩放比例
  useEffect(() => {
    if (elementsWrapperAttr.width && screen.width) {
      setCale(Number((elementsWrapperAttr.width / Number(screen.width)).toFixed(4)))
    }
  }, [screen.width, elementsWrapperAttr.width])

  // 获取elementsWrapper的宽度
  useEffect(() => {
    const resizeHander = () => {
      setElementsWrapperAttr({
        width: elementsWrapper.current?.offsetWidth
      })
    }
    resizeHander()
    // 绑定resize事件
    window.addEventListener('resize', resizeHander)

    return () => {
      // 清除resize事件
      window.removeEventListener('resize', resizeHander)
    }
  }, [elementsWrapper.current])

  return (
    <div className='app-screen-disign'>
      {/* 头部 */}
      <DesignHeader
        undoLargeScreen={undoLargeScreen}
        redoLargeScreen={redoLargeScreen}
        addLargeScreenElement={addLargeScreenElement}
        drawer={drawer}
        currentPageId={currentPage.id}
        pastPage={pastPage}
        futurePage={futurePage}
        currentWidgetId={currentWidgetId}
        setDrawer={setDrawer} />
      {/* 内容区 */}
      <div className='app-screen-disign__body'>
        {/* 左边 */}
        <DesignBodyLeft
          setLeftFlag={setLeftFlag}
          leftFlag={leftFlag}
          pages={pages}
          addLargeScreenPage={addLargeScreenPage}
          delLargeScreenPage={delLargeScreenPage}
          modifyLargeScreenPage={modifyLargeScreenPage}
          currentPageId={currentPage.id}
          changeLargeScreenPage={changeLargeScreenPage}
        />
        <div
          style={{
            paddingLeft: leftFlag ? 200 : 0,
            paddingRight: rightFlag ? 300 : 0
          }}
          className='app-screen-disign__body--center'>
          <div
            className="body"
            ref={elementsWrapper}>
            {/* 
                overflow: 'hidden',
                transform: `scale(${cale})`,
                transformOrigin: '0 0'
            */}
            <div
              className='elements-wrap'>
              <Ruler />
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  left: 66,
                  top: 66,
                  width: screen.width,
                  height: screen.height,
                  backgroundColor: screen.backgroundColor,
                  overflow: 'hidden',
                  transform: `scale(${cale})`,
                  transformOrigin: '0 0'
                }}>
                {
                  currentPage && currentPage.widgets ?
                    currentPage.widgets.map((item: any, index: number) => {
                      const Widget = components[item.code]
                      if (Widget) {
                        return (
                          <div className='app-widget__item' key={index}>
                            <Widget text={item.configureValue.elementValue} style={{
                              ...item.configureValue,
                              ...item.coordinateValue,
                              textShadow: `${item.configureValue.textShadowX}px ${item.configureValue.textShadowY}px ${item.configureValue.textShadowF}px ${item.configureValue.textShadowC}`,
                              fontSize: Number(item.configureValue.fontSize)
                            }} />
                          </div>
                        )
                      }
                    }) : null
                }
              </div>
            </div>
          </div>
          <div className="footer">
            <span>缩放比例：</span>
            <Slider
              style={{
                width: 300
              }}
              min={5}
              max={100}
              tipFormatter={(value) => `${value}%`}
              onChange={(value) => setCale(value / 100)}
              value={cale * 100} />
          </div>
        </div>
        {/* 右边 */}
        {
          pages.length ?
            <DesignBodyRight
              rightFlag={rightFlag}
              setRightFlag={setRightFlag}
              screen={screen}
              currentPage={currentPage}
              modifyLargeScreenElement={modifyLargeScreenElement}
              modifyScreen={modifyScreen}
              currentWidget={currentWidget}
              currentWidgetId={currentWidgetId} /> : null
        }
      </div>
    </div>
  )
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  pages: state.largeScreen.pages,
  pastPage: state.largeScreen.pastPage,
  futurePage: state.largeScreen.futurePage,
  currentPage: state.largeScreen.currentPage,
  currentWidgetId: state.largeScreen.currentWidgetId,
  screen: state.largeScreen.screen,
  currentWidget: state.largeScreen.currentWidget
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = {
  getLargeScreenPages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  addLargeScreenElement,
  delLargeScreenElement,
  modifyLargeScreenElement,
  undoLargeScreen,
  redoLargeScreen,
  modifyScreen,
  changeLargeScreenPage
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disign)