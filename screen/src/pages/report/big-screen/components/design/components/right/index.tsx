import {
  FC
} from 'react'
import './index.scss'
import { Tabs, Form, Input, InputNumber, FormInstance, Row, Col } from 'antd'
import { widgetConfigure, pageConfigure, coordinateConfigure } from '@src/elements/tools'
import { SketchPicker } from 'react-color'
import { relative } from 'path'

const { TextArea } = Input
const { TabPane } = Tabs

interface IDesignBodyRightProps { }

const DesignBodyRight: FC<IDesignBodyRightProps> = () => {
  // 页面from
  const [pageForm] = Form.useForm()
  // 坐标from
  const [dynamicForm] = Form.useForm()
  /**
   * 动态渲染表单
   * @param datas 表格数据
   * @returns ReactNode
   */
  const renderDynamicForm = (datas: any, form: FormInstance<any>) => {
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
                  initialValue={item.value}
                >
                  <Input />
                </Form.Item>
              }
              {
                item.type === 'InputNumber' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                  initialValue={item.value}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              }
              {
                item.type === 'TextArea' &&
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.require }]}
                  initialValue={item.value}
                >
                  <TextArea rows={8} />
                </Form.Item>
              }
              {/*  */}
              {
                item.type === 'SketchPicker' &&
                <Form.Item label={item.label}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        noStyle
                        name={item.name}
                        rules={[{ required: item.require }]}
                        initialValue={item.value}
                      >
                        <Input allowClear />
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
                                <SketchPicker color={item.value} onChange={e => {
                                  form.setFieldsValue({
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

  return (
    <div className='app-screen-disign__body--right'>

      <Tabs className='custom-tabs' defaultActiveKey="1" destroyInactiveTabPane>
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
              onValuesChange={(changedValues, allValues) => console.log(allValues)}
              onChange={e => console.log(e)}
            >
              {
                renderDynamicForm(pageConfigure.configure, pageForm)
              }
            </Form>
          </div>
        </TabPane>
        <TabPane tab="配置" key="2">
          Content of Tab Pane 2
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
              onValuesChange={(changedValues, allValues) => console.log(allValues)}
            >
              {
                renderDynamicForm(coordinateConfigure.configure, dynamicForm)
              }
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
export default DesignBodyRight