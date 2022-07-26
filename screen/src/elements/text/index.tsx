import {
  FC,
  HTMLAttributes
} from 'react'
import './index.scss'

interface ITextProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  options?: any;
}

const Text: FC<ITextProps> = ({
  text = '文本框',
  options = {},
  className,
  children,
  ...rest
}) => {
  return (
    <div className={`app-widget app-widget__text ${className || ''}`} {...rest}>{text}</div>
  )
}
export default Text