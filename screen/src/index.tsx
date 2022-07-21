import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import App from './App'
import { isInIcestark, setLibraryName } from '@ice/stark-app'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store from './store/index'
import reportWebVitals from './reportWebVitals'
import '@ant-design/pro-table/dist/table.css';
// 国际化
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.min.css'
import './index.scss'
moment.locale('zh-cn')
const persistor = persistStore(store)

export function mount(props: any) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <App parentParams={props.customProps} />
        </ConfigProvider>
      </PersistGate>
    </Provider>, props.container);
}

export function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(props.container);
}

// 注意：`setLibraryName` 的入参需要与 webpack 工程配置的 output.library 保持一致
setLibraryName('base');

if (!isInIcestark()) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <App parentParams={{}} />
        </ConfigProvider>
      </PersistGate>
    </Provider>, document.getElementById('root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
