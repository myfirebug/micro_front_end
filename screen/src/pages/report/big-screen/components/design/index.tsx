import React, {
  FC, useState
} from 'react'

// 头部
import DesignHeader from './components/header'
// 主题左边
import DesignBodyLeft from './components/left'
// 主题右边
import DesignBodyRight from './components/right'
// 所有组件地址
import components from '@src/elements'
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

  const [eles, setEles] = useState([])

  return (
    <div className='app-screen-disign'>
      {/* 头部 */}
      <DesignHeader drawer={drawer} setDrawer={setDrawer} />
      {/* 内容区 */}
      <div className='app-screen-disign__body'>
        {/* 左边 */}
        <DesignBodyLeft />
        <div className='app-screen-disign__body--center'>
          <Ruler />
          <div>
            {
              eles.map((item: any, index: number) => {
                if (components[item.components]) {
                  const Widget = components[item.components]
                  return (
                    <div className='app-widget__wrap' key={index}>
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
        {/* 右边 */}
        <DesignBodyRight />
      </div>
    </div>
  )
}
export default Disign