import { Suspense, lazy, memo } from 'react'
import ComPrivateRoute from '@src/components/private-route'
import {
  Switch,
  Redirect
} from 'react-router-dom'
import Loading from '@src/components/loading'
import { IRouter } from '@store/actionType'

interface IAppProps {
  routers: IRouter[];
  parentParams: any;
}

const Routers = memo((props: IAppProps) => {
  const { routers, parentParams } = props

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/*首页*/}
        {
          routers.map(item => (
            <ComPrivateRoute
              key={item.id}
              isPrivate={true}
              title={item.name}
              path={item.path}
              parentParams={parentParams}
              component={lazy(() => import(`@src/pages/${item.component}`))} />
          ))
        }
        {
          routers.length ?
            <Redirect path="*" exact to={routers[0].path} /> : null
        }
      </Switch>
    </Suspense>
  );
})

export default Routers
