import {
  FC
} from 'react'
import { Result } from 'antd'
import './index.scss'

interface INotFindProps { }

const NotFind: FC<INotFindProps> = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，该页面走丢了~~"
    />
  )
}

export default NotFind