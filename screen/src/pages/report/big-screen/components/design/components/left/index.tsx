import {
  FC
} from 'react'
import './index.scss'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface IDesignBodyLeftProps { }

const DesignBodyLeft: FC<IDesignBodyLeftProps> = () => {
  return (
    <div className='app-screen-disign__body--left'>
      <div className='body'>
        <Button
          type="primary"
          block
          icon={<PlusOutlined />}>
          新增页面
        </Button>
      </div>
      <div className="header">可配置页面</div>
      <ul className="page">
        <li className="page-item">xxx</li>
      </ul>
    </div>
  )
}
export default DesignBodyLeft