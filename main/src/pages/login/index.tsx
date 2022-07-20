import { FC, useEffect } from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import session from '@src/utils/session-storage'
import { connect } from 'react-redux'
import { ALL_STATE } from '@store/actionType'
import { getAuthApps } from '@src/store/actions/auth-apps'
import { appHistory } from '@ice/stark-app'
import { routePrefix } from '@src/utils/tools'
import './index.scss'

interface ILoginProps {
  getAuthApps: (callback: Function) => void;
}

const Login: FC<ILoginProps> = ({
  getAuthApps
}) => {
  // 获取form实例
  const [loginForm] = Form.useForm()
  // 处理登录成功时，反问登录页面跳到基础平台首页
  useEffect(() => {
    session.setItem('routePrefix', routePrefix)
    if (session.getItem('access_token')) {
      appHistory.replace(`${routePrefix}/home`)
    }
  }, [])
  // 登录
  const onFinish = (values: any) => {
    session.setItem('access_token', values.username + values.password)
    session.setItem('username', values.username)
    session.setItem('refresh_token', values.username + values.password)
    session.setItem('platform', {
      appLogo: '//lhcdn.lanhuapp.com/web/imgs/lanhuLogo1db1cd87.svg',
      appTitle: '微前端-飞冰'
    })
    getAuthApps((data: any[]) => {
      if (data.length) {
        appHistory.replace(`${routePrefix}/home`)
      }
    })
  }
  return (
    <div className="app-login">
      <div className="app-login__form">
        <div className="header">
          <div className="logo"></div>
          <h2 className="title">微前端-飞冰</h2>
        </div>
        <div className="body">
          <Form
            name="basic-login"
            form={loginForm}
            initialValues={{ remember: true, agreement: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}>
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账户" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large">登录</Button>
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked" >
              <Checkbox
                className="agreement">已阅读并同意<span>《用户使用协议》</span>及<span>《用户隐私协议》</span></Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  counter: state.counter,
  userInfo: state.userInfo
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = {
  getAuthApps
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)