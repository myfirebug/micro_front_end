import { memo, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import session from '@src/utils/session-storage'

interface IPrivateRoute {
  component: any;
  title: string;
  isPrivate: boolean;
  [propName: string]: any;
}
const PrivateRoute = memo((
  {
    // eslint-disable-next-line react/prop-types
    component: Component,
    title,
    isPrivate,
    ...rest
  }: IPrivateRoute
) => {
  // 处理标题
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Route
      {...rest}
      render={() => {
        if (isPrivate) {
          return session.getItem('access_token') ? (
            <Component {...rest} title={title} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          );
        } else {
          return <Component {...rest} />;
        }
      }}
    />
  )
})

export default PrivateRoute;
