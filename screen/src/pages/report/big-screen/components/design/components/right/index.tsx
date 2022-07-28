import {
  FC, useEffect, useState
} from 'react'
import './index.scss'
import { Tabs, Form, Input, InputNumber, FormInstance, Row, Col, Select, Collapse, Switch, Slider } from 'antd'
import { pageConfigure, coordinateConfigure } from '@src/widget/tools'
import { SketchPicker } from 'react-color'
import { IScreen, IWidget } from '@src/store/actionType'

const { TextArea } = Input
const { TabPane } = Tabs
const { Option } = Select
const { Panel } = Collapse

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

  useEffect(() => {
    if (currentWidget.configureValue) {
      configureForm.setFieldsValue(currentWidget.configureValue)
    }
    if (currentWidget.coordinateValue) {
      dynamicForm.setFieldsValue(currentWidget.coordinateValue)
    }
  }, [currentWidget])
  // 判断数据是Array 或者 object
  const judgeType = (data: any, type: string) => {
    return Object.prototype.toString.call(data) == type
  }

  /**
   * 动态渲染表单
   * @param datas 表格数据
   * @returns ReactNode
   */
  const renderDynamicForm = (datas: any, form: FormInstance<any>, callback: Function, field?: string) => {
    return datas.map((item: any, index: number) => {
      if (judgeType(item, '[object Object]')) {
        return (
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
              item.type === 'Switch' &&
              <Form.Item
                label={item.label}
                name={item.name}
                valuePropName="checked"
                rules={[{ required: item.require }]}
              >
                <Switch />
              </Form.Item>
            }
            {
              item.type === 'Slider' &&
              <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.require }]}
              >
                <Slider />
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
                    <Form.Item shouldUpdate noStyle>
                      {
                        () => (
                          <div className='color-wrapper' style={{
                            background: form.getFieldValue(item.name),
                            width: '100%'
                          }}>
                            获取颜色
                            <div className='color'>
                              <SketchPicker
                                color={form.getFieldValue(item.name)}
                                onChange={e => {
                                  form.setFieldsValue({
                                    [item.name]: e.hex
                                  })
                                  if (!field) {
                                    callback && callback({
                                      [item.name]: e.hex
                                    })
                                  } else {
                                    const newCurrentWidget = JSON.parse(JSON.stringify(currentWidget))
                                    newCurrentWidget[field][item.name] = e.hex
                                    callback && callback(currentWidgetId, newCurrentWidget)
                                  }
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
        )
      }
      if (judgeType(item, '[object Array]')) {
        return (
          <Collapse accordion key={index}>
            {
              item.map((subItem: any, subIndex: number) => (
                <Panel header={subItem.name} key={subIndex}>
                  {
                    renderDynamicForm(subItem.list, form, callback, field)
                  }
                </Panel>
              ))
            }
          </Collapse>
        )
      }
    })
  }

  useEffect(() => {
    if (currentWidgetId) {
      setKey('2')
    } else {
      setKey('1')
    }
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
        </TabPane>
        {
          currentWidgetId && <>
            <TabPane tab="配置" key="2">
              <Form
                form={configureForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete="off"
                labelAlign="left"
                onValuesChange={(changedValues, allValues) => modifyLargeScreenElement(currentWidgetId, {
                  ...currentWidget,
                  configureValue: allValues
                })}
              >
                {
                  renderDynamicForm(
                    currentWidget.configure,
                    configureForm,
                    modifyLargeScreenElement,
                    'configureValue'
                  )
                }
              </Form>
            </TabPane>
            <TabPane tab="数据" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="坐标" key="4">
              <Form
                form={dynamicForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                autoComplete="off"
                labelAlign="left"
                onValuesChange={(changedValues, allValues) => modifyLargeScreenElement(currentWidgetId, {
                  ...currentWidget,
                  coordinateValue: allValues
                })}
              >
                {
                  renderDynamicForm(
                    coordinateConfigure.configure,
                    dynamicForm,
                    modifyLargeScreenElement,
                    'coordinateValue'
                  )
                }
              </Form>
            </TabPane>
          </>
        }
      </Tabs>
    </div>
  )
}
export default DesignBodyRight