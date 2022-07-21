import { FC, useMemo, ReactNode, useState, useEffect } from 'react'
import session from '@src/utils/session-storage'
import { routePrefix } from '@src/utils/tools'
import { Dropdown, Menu } from 'antd'
import { appHistory, AppLink } from '@ice/stark-app'
import { LogoutOutlined } from '@ant-design/icons'
import { IAuthappItem, IMenu } from '@src/store/actionType'
import './index.scss'
// 自定义菜单
import CustomMenu from './components/menu'
// 头像
import CostomAvatar from '@src/components/avatar'

interface ILayoutsProps {
  pathname: string;
  children: ReactNode;
  authApps: IAuthappItem[];
  menus: IMenu[];
  getMenu: (appCode?: string, callback?: Function) => void;
}

const Layouts: FC<ILayoutsProps> = ({
  pathname,
  children,
  authApps,
  getMenu,
  menus
}) => {
  // 获取平台数据
  const [platform, setPlatform] = useState<any>(session.getItem('platform'))
  // 展开收起
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (platform?.appLogo) {
      document.getElementById('js_favicon')?.setAttribute('href', platform.appLogo)
    }
  }, [platform])
  useEffect(() => {
    const callback = (e: any) => {
      setPlatform(session.getItem('platform'))
    }
    window.addEventListener('setSessionItemEvent', callback)
    return () => {
      window.removeEventListener('setSessionItemEvent', callback)
    }
  }, [])
  // 菜单
  const menuHeaderDropdown = (
    <Menu className='app-dropdown'>
      <Menu.Item key="1">
        <AppLink to={`${routePrefix}/me/information`}>
          <LogoutOutlined style={{ marginRight: 5 }} />
          个人中心
        </AppLink>
      </Menu.Item>
      <Menu.Item key="loginOut" onClick={() => {
        window.sessionStorage.clear()
        appHistory.replace(`${routePrefix}/login`)
      }}>
        <LogoutOutlined style={{ marginRight: 5 }} />
        退出登录
      </Menu.Item>
    </Menu >
  )

  // 判断是否显示头部
  const isShowHead = useMemo(() => {
    if (pathname === `${routePrefix}/login` || !session.getItem('access_token')) {
      return false
    } else {
      return true
    }
  }, [pathname])

  // 跳转子平台
  const jumpManage = (item: any) => {
    if (item.appCode !== session.getItem('appCode')) {
      getMenu(item.appCode, () => {
        appHistory.replace(`${routePrefix}/${item.appCode}`)
      })
    }
  }

  return (
    <div className="app-frame">
      {
        isShowHead ?
          <header className="app-frame__header">
            <div className={`left ${collapsed ? 'is-close' : ''}`}>
              <div className="logo">
                <img src={platform.appLogo} alt={platform.appTitle} />
              </div>
              {
                !collapsed ?
                  <p className='sitename'>{platform.appTitle}</p> : null
              }
            </div>
            <div className='center'>
              {
                authApps.map(item => {
                  if (item.appCode !== 'public') {
                    return (
                      <div
                        key={item.xdid}
                        onClick={() => jumpManage(item)}
                        className={`${item.appCode === session.getItem('appCode') ? 'is-active' : ''}`}>
                        {item.appTitle}
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
            <div className="right">
              <Dropdown overlay={menuHeaderDropdown} className="user-wrapper">
                <span className='account' style={{ marginLeft: 15 }}>
                  <CostomAvatar src="" />
                  <span className={`anticon`}>{session.getItem('username')}</span>
                </span>
              </Dropdown>
            </div>
          </header> : null
      }
      <div className={`app-frame__main ${collapsed ? 'is-close' : (!isShowHead ? 'is-no' : '')}`}>
        {
          isShowHead ?
            <div className={`app-frame__aside ${collapsed ? 'is-close' : ''}`}>
              <CustomMenu
                menu={menus}
                setCollapsed={setCollapsed}
                collapsed={collapsed}
                pathname={pathname}
              />
            </div> : null
        }
        <div className={`app-frame__body ${isShowHead ? '' : 'is-blank'}`}>
          {
            children
          }
        </div>
      </div>
    </div>
  )
}

export default Layouts