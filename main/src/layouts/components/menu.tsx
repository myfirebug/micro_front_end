import React, {
  memo,
  useState,
  useEffect,
  useRef
} from 'react'
import { Menu } from 'antd'
import { IMenu } from '@store/actionType'
import { AppLink } from '@ice/stark-app'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import session from '@src/utils/session-storage'
import { getParamUrl } from '@src/utils/tools'
import { routePrefix } from '@src/utils/tools'

const { SubMenu } = Menu

interface ICustomMenuProps {
  menu: IMenu[];
  setCollapsed: React.Dispatch<any>;
  collapsed: boolean;
  pathname: string;
}

const CustomMenu = memo((props: ICustomMenuProps) => {
  const {
    menu,
    setCollapsed,
    collapsed,
    pathname
  } = props
  // 获取当前选中的路由
  const [current, setCurrent] = useState(session.getItem('currentUrl') || `${routePrefix}/base_app/home`)
  // 所有一级菜单
  const rootSubmenuKeys = useRef<string[]>([]);
  // 打开的菜单
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 初始化选中的数据
  useEffect(() => {
    const routerSplit = pathname.split('/')
    const currentOpenKeys: string[] = []
    routerSplit.pop()
    if (routerSplit.length > 1) {
      for (let i = 2; i < routerSplit.length; i++) {
        currentOpenKeys.push(routerSplit.slice(0, i + 1).join('/'))
      }
      setOpenKeys(currentOpenKeys)
    }
    if (routerSplit.findIndex(item => item === 'home')) {
      setCurrent(pathname)
    }
  }, [pathname])

  // 动态生存菜单
  // eslint-disable-next-line
  const getMenuNodes = (menuList: any) => {
    // eslint-disable-next-line
    return menuList.map((item: any) => {
      if (item.subResource && item.subResource.some((subItem: any) => subItem.isMemu === 1)) {
        if (item.resUrl && item.resUrl.split('/').length === 3 && rootSubmenuKeys.current.indexOf(item.resUrl) === -1) {
          rootSubmenuKeys.current = [...rootSubmenuKeys.current, item.resUrl]
        }
        return (
          <SubMenu
            title={item.resTitle}
            icon={
              item.resIcon ?
                <span className='bg-icon' dangerouslySetInnerHTML={{ __html: `&#x${item.resIcon}` }} />
                : null
            }
            key={item.resUrl}
          >
            {
              getMenuNodes(item.subResource)
            }
          </SubMenu>
        );
      }
      if (item.components) {
        return (
          <Menu.Item
            title={item.resTitle}
            icon={
              item.resIcon ?
                <span className='bg-icon' dangerouslySetInnerHTML={{ __html: `&#x${item.resIcon}` }} />
                : null
            }
            key={item.resUrl}>
            <AppLink to={getParamUrl(item.resUrl)}>{item.resTitle}</AppLink>
          </Menu.Item>
        );
      }
    });
  }

  // 选择中菜单这里用于跳转
  const menuClickHandler = (key: string) => {
    console.log(key, 'keykeykeykeykey')
    setCurrent(key)
    session.setItem('currentUrl', key)
  }
  // 展开收起菜单时
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.current.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <div
        className='switch'
        onClick={() => {
          setCollapsed((state: boolean) => !state)
        }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </div>
      <Menu
        inlineCollapsed={collapsed}
        selectedKeys={[current]}
        onClick={(e: any) => menuClickHandler(e.key)}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="dark"
      >
        {getMenuNodes(menu)}
      </Menu>
    </>
  )
})

export default CustomMenu