import {
  FC
} from 'react'
import './index.scss'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IPage } from '@src/store/actionType'

interface IDesignBodyLeftProps {
  pages: IPage[];
  addLargeScreenPage: (data: IPage) => void;
  delLargeScreenPage: (id: string) => void;
}

const DesignBodyLeft: FC<IDesignBodyLeftProps> = ({
  pages,
  addLargeScreenPage,
  delLargeScreenPage
}) => {
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
      <div className="header">页面列表</div>
      <ul className="page">
        <li className="page-item">xxx</li>
      </ul>
    </div>
  )
}
export default DesignBodyLeft