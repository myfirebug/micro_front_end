import { FC, useEffect } from 'react'
import { AppRoute } from '@ice/stark'
import session from '@src/utils/session-storage'
import { appHistory } from '@ice/stark-app'
import { IAnyObject } from '@src/types'

interface IAuthAppRouteProps extends IAnyObject { }

const AuthAppRoute: FC<IAuthAppRouteProps> = (props) => {
  useEffect(() => {
    if (!session.getItem('access_token')) {
      appHistory.push('/login')
    }
  }, [])
  return (
    <>
      {
        session.getItem('access_token') ? <AppRoute {...props} /> : ''
      }
    </>
  )
}

export default AuthAppRoute