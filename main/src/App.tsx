/**
 * AppRouter里props说明
 * appCode： 站点CODE
 * menus： 传入子应用的菜单
 * isMicroFront： 是否是微前端
 */
import { lazy, Suspense, useState, FC } from 'react'
// 需要token的路由请使用这个
import ComPrivateRoute from '@src/components/private-route'
import Loading from '@src/components/loading'
import { AppRouter, AppRoute } from '@ice/stark'
import Layouts from '@src/layouts'
import { connect } from 'react-redux'
import { ALL_STATE, IAuthappItem, IMenu } from '@store/actionType'
// 子应用如果需要带token就需要使用该组件
import AuthAppRoute from '@src/components/auth-app-route'
import session from '@src/utils/session-storage'
import { routePrefix } from '@src/utils/tools'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

const baseUrl = process.env.REACT_APP_ENV

interface IAppProps {
  authApps: IAuthappItem[];
  menus: IMenu[];
}

// 对应的路由前缀
const prefix: any = {
  // 初中评价方案管理
  application_first_evaluate_app: 'application_first_evaluate_app',
  // 高中评价方案管理
  application_high_evaluate_app: 'application_first_evaluate_app',
  // 高中生涯
  application_high_career_app: 'application_high_career_app'
}

const App: FC<IAppProps> = ({
  authApps,
  menus
}) => {
  const [pathname, setPathname] = useState('/login')

  // 监控路由变化
  const handleRouteChange = (path: string) => {
    setPathname(path)
    session.setItem('currentPath', path)
  }
  return (
    <Suspense fallback={
      <Loading />
    }>
      <Layouts
        pathname={pathname}>
        <AppRouter
          LoadingComponent={
            <Loading text='loading...' />
          }
          onRouteChange={handleRouteChange}
        >
          {
            authApps.map(item => (
              <AuthAppRoute
                key={item.xdid}
                cached
                activePath={`${routePrefix}/${item.appCode}`}
                props={{
                  appCode: item.appCode,
                  menus: menus,
                  isMicroFront: true
                }}
                sandbox={true}
                // 这里是你微应用打包之后服务器的地址
                entry={baseUrl !== 'development' ? item.appUrl : `http://172.19.20.5/application/${prefix[item.appCode]}/build/index.html`}
              />
            ))
          }
          <AppRoute
            cached
            activePath="*"
            render={() => (
              <Router basename={routePrefix}>
                <Switch>
                  {/*登录*/}
                  <Route
                    path="/login"
                    component={lazy(() => import(/*webpackChunkName:"login"*/'@pages/login'))}
                  />
                  {/*首页*/}
                  <ComPrivateRoute
                    path="/home"
                    title="首页"
                    isPrivate={true}
                    component={lazy(() => import(/*webpackChunkName:"home"*/'@pages/home'))} />
                  {/*404*/}
                  <ComPrivateRoute
                    path="/404"
                    title="404"
                    isPrivate={true}
                    component={lazy(() => import(/*webpackChunkName:"404"*/'@pages/404'))}
                  />
                  {/* 个人中心 */}
                  <ComPrivateRoute
                    path="/me"
                    title="个人中心"
                    isPrivate={true}
                    component={lazy(() => import(/*webpackChunkName:"account"*/'@pages/me'))}
                  ></ComPrivateRoute>
                  <Redirect path="*" exact to="/login" />
                </Switch>
              </Router>
            )}
          />
        </AppRouter>
      </Layouts>
    </Suspense >
  );
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  authApps: state.authApps,
  menus: state.authorization.menu
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
