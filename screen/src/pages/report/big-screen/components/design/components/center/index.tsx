import {
  FC
} from 'react'
import { IPage, IWidget } from '@store/actionType'
import { Rnd } from 'react-rnd'
// 所有组件地址
import components from '@src/widget'

interface IDesignBodyCenterProps {
  currentPage: IPage;
  currentWidgetId: string;
  currentWidget: IWidget;
  cale: number;
  modifyLargeScreenElement: (id: string, data: IWidget, callback?: Function) => void;
  changeLargeScreenElement: (id: string, callback?: Function) => void;
}

const DesignBodyCenter: FC<IDesignBodyCenterProps> = ({
  currentPage,
  currentWidgetId,
  modifyLargeScreenElement,
  changeLargeScreenElement,
  currentWidget,
  cale
}) => {
  // 移动时
  const dragStopHandle = (e: any, d: any) => {
    modifyLargeScreenElement(currentWidgetId, {
      ...currentWidget,
      coordinateValue: {
        ...currentWidget.coordinateValue,
        left: Number(d.lastX.toFixed(2)),
        top: Number(d.lastY.toFixed(2))
      }
    })
  }

  // 改变盒子的比例时
  const resizeHandle = (e: any, direction: any, ref: any, delta: any, position: any) => {
    modifyLargeScreenElement(currentWidgetId, {
      ...currentWidget,
      coordinateValue: {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
        left: Number(position.x.toFixed(2)),
        top: Number(position.y.toFixed(2))
      }
    })
  }
  return (
    <>
      {
        currentPage && currentPage.widgets ?
          currentPage.widgets.map((item: any, index: number) => {
            const Widget = components[item.code]
            if (Widget) {
              return (
                <Rnd
                  className={item.id !== currentWidgetId ? 'react-draggable-disabled' : ''}
                  default={{
                    x: item.coordinateValue.left,
                    y: item.coordinateValue.top,
                    width: item.coordinateValue.width,
                    height: item.coordinateValue.height
                  }}
                  position={{
                    x: item.coordinateValue.left,
                    y: item.coordinateValue.top
                  }}
                  resizeHandleWrapperClass="handle"
                  resizeHandleWrapperStyle={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    border: 'dashed 2px #fff'
                  }}
                  resizeHandleStyles={{
                    bottom: {
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: 10,
                      left: '50%',
                      bottom: -10,
                      marginLeft: -10
                    },
                    bottomLeft: {
                      background: '#fff',
                      borderRadius: 10
                    },
                    bottomRight: {
                      background: '#fff',
                      borderRadius: 10
                    },
                    left: {
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: 10,
                      top: '50%',
                      left: -10,
                      marginTop: -10
                    },
                    right: {
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: 10,
                      top: '50%',
                      right: -10,
                      marginTop: -10
                    },
                    top: {
                      width: 20,
                      height: 20,
                      background: '#fff',
                      borderRadius: 10,
                      left: '50%',
                      top: -10,
                      marginLeft: -10
                    },
                    topLeft: {
                      background: '#fff',
                      borderRadius: 10
                    },
                    topRight: {
                      background: '#fff',
                      borderRadius: 10
                    }
                  }}
                  key={index}
                  scale={cale}
                  disableDragging={item.id !== currentWidgetId}
                  onDragStop={dragStopHandle}
                  onResizeStop={resizeHandle}
                  bounds="parent"
                >
                  <div
                    onClick={(e) => {
                      if (item.id !== currentWidgetId) {
                        changeLargeScreenElement(item.id)
                      }
                    }}
                    className={`app-widget__item ${item.id === currentWidgetId ? 'is-active' : ''}`}>
                    <div className="mask">
                      {/* 辅助线 */}
                      <div className='line-top'></div>
                      <div className='line-left'></div>
                      {/* 坐标值 */}
                      <div className="label">{item.coordinateValue.left},{item.coordinateValue.top}</div>
                    </div>
                    <Widget
                      text={item.configureValue.elementValue}
                      style={{
                        ...item.configureValue,
                        width: '100%',
                        height: '100%',
                        textShadow: `${item.configureValue.textShadowX}px ${item.configureValue.textShadowY}px ${item.configureValue.textShadowF}px ${item.configureValue.textShadowC}`,
                        fontSize: Number(item.configureValue.fontSize)
                      }} />
                  </div>
                </Rnd>
              )
            }
          }) : null
      }
    </>
  )
}

export default DesignBodyCenter