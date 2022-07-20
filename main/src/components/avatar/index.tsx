/*
 * @Author: hejp 
 * @Date: 2022-05-20 09:17:25 
 * @Last Modified by: hejp
 * @Last Modified time: 2022-05-31 09:45:37
 */
import {
  FC
} from 'react'
import './index.scss'

interface IAvatarProps {
  src: string;
  size?: 'small' | 'default' | 'large' | 'mini' | 'great'
}

const Avatar: FC<IAvatarProps> = ({
  src,
  size = 'small'
}) => {
  return (
    <div className={`app-avatar is-${size}`}>
      {
        src ?
          <img src={src} alt="头像" /> : null
      }
    </div>
  )
}

export default Avatar