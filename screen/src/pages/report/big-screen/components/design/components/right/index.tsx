import {
  FC, useEffect, useState
} from 'react'
import './index.scss'
import { Tabs, Form, Input, InputNumber, FormInstance, Row, Col, Select } from 'antd'
import { pageConfigure, coordinateConfigure } from '@src/widget/tools'
import { SketchPicker } from 'react-color'
import { IScreen, IWidget } from '@src/store/actionType'

const { TextArea } = Input
const { TabPane } = Tabs
const { Option } = Select

interface IDesignBodyRightProps {
  screen: IScreen;
  modifyScreen: (datas: any) => void;
  currentWidgetId: string;
  currentWidget: IWidget;
  modifyLargeScreenElement: (id: string, data: IWidget, callback?: Function) => void;
}

const DesignBodyRight: FC<IDesignBodyRightProps> = ({
  screen,
  modifyScreen,
  currentWidgetId,
  currentWidget,
  modifyLargeScreenElement
}) => {
  const [key, setKey] = useState('1')
  // 配置from
  const [configureForm] = Form.useForm()
  // 页面from
  const [pageForm] = Form.useForm()
  // 坐标from
  const [dynamicForm] = Form.useForm()
  /**
   * 动态渲染表单
   * @param datas 表格数据
   * @returns ReactNode
   */
  const renderDynamicForm = (datas: any, form: FormInstance<any>, callback?: Function) => {
    return (
      <>
        {
          datas.map((item: any, index: number) => (
            <div key={index}>
              {
                item.type === 'Input' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                >
                  <Input placeholder={item.placeholder} />
                </Form.Item>
              }
              {
                item.type === 'InputNumber' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder={item.placeholder} />
                </Form.Item>
              }
              {
                item.type === 'TextArea' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                >
                  <TextArea rows={8} placeholder={item.placeholder} />
                </Form.Item>
              }
              {
                item.type === 'Select' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                >
                  <Select placeholder={item.placeholder}>
                    {
                      item.options.map((item: any) => (
                        <Option
                          key={item.code}
                          value={item.code}>
                          {item.name}
                        </Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              }
              {
                item.type === 'SketchPicker' &&
                <Form.Item label={item.label}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        noStyle
                        name={item.name}
                        rules={[{ required: item.require }]}
                      >
                        <Input allowClear placeholder={item.placeholder} />
                      </Form.Item>
                    </Col>
                    <Col span={11} offset={1}>
                      <Form.Item shouldUpdate>
                        {
                          () => (
                            <div className='color-wrapper' style={{
                              background: form.getFieldValue(item.name)
                            }}>
                              获取颜色
                              <div className='color'>
                                <SketchPicker
                                  color={form.getFieldValue(item.name)}
                                  onChange={e => {
                                    form.setFieldsValue({
                                      [item.name]: e.hex
                                    })
                                    callback && callback({
                                      [item.name]: e.hex
                                    })
                                  }} />
                              </div>
                            </div>
                          )
                        }
                      </Form.Item>

                    </Col>
                  </Row>
                </Form.Item>
              }
            </div>
          ))
        }
      </>
    )
  }

  useEffect(() => {
    setKey('2')
  }, [currentWidgetId])

  return (
    <div className='app-screen-disign__body--right'>
      <Tabs
        className='custom-tabs'
        activeKey={key}
        onChange={key => setKey(key)}
        destroyInactiveTabPane>
        <TabPane tab="图层" key="5">
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab="项目配置" key="1">
          <div className='body'>
            <Form
              form={pageForm}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              autoComplete="off"
              labelAlign="left"
              initialValues={screen}
              onValuesChange={(changedValues, allValues) => modifyScreen(allValues)}
            >
              {
                renderDynamicForm(pageConfigure.configure, pageForm, modifyScreen)
              }
            </Form>
          </div>
        </TabPane>
        {
          currentWidgetId && <>
            <TabPane tab="配置" key="2">
              <div className='body'>
                <Form
                  form={configureForm}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  autoComplete="off"
                  labelAlign="left"
                  initialValues={currentWidget.options.configureValue}
                  onValuesChange={(changedValues, allValues) => modifyLargeScreenElement(currentWidgetId, {
                    ...currentWidget,
                    options: {
                      ...currentWidget.options,
                      configureValue: allValues
                    }
                  })}
                >
                  {
                    renderDynamicForm(currentWidget.options.configure, configureForm)
                  }
                </Form>
              </div>
            </TabPane>
            <TabPane tab="数据" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="坐标" key="4">
              <div className='body'>
                <Form
                  form={dynamicForm}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  autoComplete="off"
                  labelAlign="left"
                  initialValues={currentWidget.options.coordinateValue}
                  onValuesChange={(changedValues, allValues) => modifyLargeScreenElement(currentWidgetId, {
                    ...currentWidget,
                    options: {
                      ...currentWidget.options,
                      coordinateValue: allValues
                    }
                  })}
                >
                  {
                    renderDynamicForm(coordinateConfigure.configure, dynamicForm)
                  }
                </Form>
              </div>
            </TabPane>
          </>
        }
      </Tabs>
    </div>
  )
}
export default DesignBodyRight