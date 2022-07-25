import {
  FC
} from 'react'
import './index.scss'

interface ITextProps {
  text?: string;
}

const Text: FC<ITextProps> = ({
  text = '文本框'
}) => {
  return (
    <div className='app-widget__text'>{text}</div>
  )
}
export default Text