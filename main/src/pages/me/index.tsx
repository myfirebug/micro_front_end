import {
  FC,
  lazy,
  useEffect,
  useState
} from 'react'
import ComPrivateRoute from '@src/components/private-route'
import session from '@src/utils/session-storage'
import { AppLink } from '@ice/stark-app'
import { routePrefix } from '@src/utils/tools'
import './index.scss'
interface IAccountProps { }
const menus = [{
  path: `${routePrefix}/me/information`,
  name: '个人信息'
}]

const Account: FC<IAccountProps> = () => {
  // 获取当前url地址
  const [currentPath, setCurrentPath] = useState<any>(session.getItem('currentPath'))
  // 选中的菜单值
  const [name, setName] = useState('')
  useEffect(() => {
    const index = menus.findIndex(item => item.path === currentPath)
    if (index > -1) {
      setName(menus[index].name)
    }
  }, [currentPath])
  useEffect(() => {
    const callback = () => {
      setCurrentPath(session.getItem('currentPath'))
    }
    window.addEventListener('setSessionItemEvent', callback)
    return () => {
      window.removeEventListener('setSessionItemEvent', callback)
    }
  }, [])

  return (
    <div className="app-me">
      <div className="app-me__left">
        <div className="title">个人中心</div>
        <ul className='sub-menu'>
          {
            menus.map(item => (
              <li
                key={item.path}
                className={`sub-menu__item ${item.path === currentPath ? 'is-active' : ''}`}>
                <AppLink to={item.path}>{item.name}</AppLink>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="app-me__right">
        <div className="app-me__right--header">{name}</div>
        <div className="app-me__right--body">
          <ComPrivateRoute
            path="/me/information"
            title="个人信息"
            isPrivate={true}
            component={lazy(() => import(/*webpackChunkName:"information"*/'@pages/me/information'))}
          ></ComPrivateRoute>
        </div>
      </div>
    </div>
  )
}

export default Account