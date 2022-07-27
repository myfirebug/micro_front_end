import React, {
  FC,
  useEffect,
  useState,
  useRef
} from 'react'
import { ALL_STATE, IPage, IScreen, IWidget } from '@store/actionType'
import { connect } from 'react-redux'
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
  modifyLargeScreenElement
}) => {

  // 获取装组件的盒子，这里需要获取他的宽度
  const elementsWrapper = useRef<HTMLDivElement>(null)
  const [elementsWrapperAttr, setElementsWrapperAttr] = useState<any>({})
  // 获取放大缩小比例
  const [cale, setCale] = useState(0)

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
    window.addEventListener('resize', resizeHander)
    return () => {
      window.removeEventListener('resize', resizeHander)
    }
  }, [elementsWrapper.current])

  return (
    <div className='app-screen-disign'>
      {/* 头部 */}
      <DesignHeader
        addLargeScreenElement={addLargeScreenElement}
        drawer={drawer}
        currentPageId={currentPage.id}
        setDrawer={setDrawer} />
      {/* 内容区 */}
      <div className='app-screen-disign__body'>
        {/* 左边 */}
        <DesignBodyLeft
          pages={pages}
          addLargeScreenPage={addLargeScreenPage}
          delLargeScreenPage={delLargeScreenPage}
          modifyLargeScreenPage={modifyLargeScreenPage}
          currentPageId={currentPage.id}
          changeLargeScreenPage={changeLargeScreenPage}
        />
        <div className='app-screen-disign__body--center'>
          <Ruler />
          <div className="elements-wrapper" ref={elementsWrapper}>
            <div
              className="grid">
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
            <div
              style={{
                position: 'relative',
                zIndex: 1,
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
                        <div className='app-widget__wrap' key={index}>
                          <Widget text={item.options.configureValue.elementValue} style={{
                            ...item.options.configureValue,
                            ...item.options.coordinateValue
                          }} />
                        </div>
                      )
                    }
                  }) : null
              }
            </div>
          </div>
        </div>
        {/* 右边 */}
        {
          pages.length &&
          <DesignBodyRight
            screen={screen}
            modifyLargeScreenElement={modifyLargeScreenElement}
            modifyScreen={modifyScreen}
            currentWidget={currentWidget}
            currentWidgetId={currentWidgetId} />
        }
      </div>
    </div>
  )
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  pages: state.largeScreen.pages,
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