import { FC, useMemo, ReactNode, useState, useEffect } from 'react'
import session from '@src/utils/session-storage'
import { routePrefix } from '@src/utils/tools'
import { Dropdown, Menu } from 'antd'
import { appHistory, AppLink } from '@ice/stark-app'
import { LogoutOutlined } from '@ant-design/icons'
import './index.scss'
// 头像
import CostomAvatar from '@src/components/avatar'

interface ILayoutsProps {
  pathname: string;
  children: ReactNode;
}

const Layouts: FC<ILayoutsProps> = ({
  pathname,
  children
}) => {
  // 获取平台数据
  const [platform, setPlatform] = useState<any>(session.getItem('platform'))
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


  // 跳到主应用的首页
  const jumpHome = () => {
    appHistory.replace(`${routePrefix}/home`)
  }

  return (
    <div className="app-frame">
      {
        isShowHead ?
          <header className="app-frame__header">
            <div
              onClick={jumpHome}
              className="left">
              <div className="logo">
                <img src={platform.appLogo} alt="logo" />
              </div>
              <div className="content">
                <h2 className='sub-title'>{platform.appTitle}</h2>
              </div>
            </div>
            <div className="center" id="js-menu"></div>
            <div className="right">
              <Dropdown overlay={menuHeaderDropdown}>
                <span className='account' style={{ marginLeft: 15 }}>
                  <CostomAvatar src="" />
                  <span className={`anticon`}>{session.getItem('username')}</span>
                </span>
              </Dropdown>
            </div>
          </header> : null
      }
      <div className={`app-frame__main ${!isShowHead ? 'is-no' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default Layouts