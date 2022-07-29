import {
  FC,
  useRef,
  useState
} from 'react'
import { ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-table'
import tableConfig from '@src/config/table-config'
import { Button, Space, message, Drawer } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// pop配置
import PopConfirm from '@src/components/pop-confirm'
// 设计
import Design from './components/design'

// 表格字段的类型
type TableItem = {
  // 报表id
  id: number;
  // 报表标题
  title: string;
  // 报表状态
  state: string;
  // 报表描述
  describe: string;
  // 创建时间
  createdAt: string;
}

interface IBigScreenProps { }

const BigScreen: FC<IBigScreenProps> = () => {
  const actionRef = useRef<ActionType>()

  // 抽屉数据
  const [drawer, setDrawer] = useState<any>({
    visible: false,
    // design:设计,preview:预览
    type: 'design',
    width: '100%',
    title: ''
  })

  // 表格columns
  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: '报表名称',
      dataIndex: 'title',
      ellipsis: true,
      tip: '标题过长会自动收缩',
      fieldProps: {
        placeholder: '请输入标题'
      }
    },
    {
      title: '报表描述',
      dataIndex: 'describe',
      ellipsis: true,
      search: false
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择状态'
      },
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error'
        },
        closed: {
          text: '已解决',
          status: 'Success'
        },
        processing: {
          text: '解决中',
          status: 'Processing'
        }
      }
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1]
          };
        }
      }
    },
    {
      title: '操作',
      render(dom, record, index, action, schema) {
        return (
          <div className='app-table__operation'>
            <span
              onClick={() => message.error('对不起你没有编辑权限')}
              className='link'>编辑</span>
            <PopConfirm text='删除'
              requestName="aaa"
              params={{
                ids: [record.id]
              }}
              reload={actionRef.current?.reloadAndRest}></PopConfirm>
            <TableDropdown
              style={{
                marginLeft: 10
              }}
              key="actionGroup"
              onSelect={(value) => setDrawer((state: any) => ({
                ...state,
                visible: true,
                title: record.title,
                type: value,
                width: '100%'
              }))}
              menus={[
                { key: 'preview', name: '预览' },
                { key: 'design', name: '设计' }
              ]}
            >更多</TableDropdown>
          </div>
        )
      }
    }
  ]


  // 选中的数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  // table复选框
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  console.log(selectedRowKeys, 'selectedRowKeys')
  return (
    <>
      <Drawer
        title={drawer.title}
        width={drawer.width}
        destroyOnClose={true}
        headerStyle={{
          display: 'none'
        }}
        bodyStyle={{
          padding: 0,
          background: '#535353'
        }}
        onClose={() => setDrawer((state: any) => ({
          ...state,
          visible: false
        }))} visible={drawer.visible}>
        {
          drawer.type === "design" &&
          <Design drawer={drawer} setDrawer={setDrawer} />
        }
      </Drawer>
      <ProTable<TableItem>
        {...tableConfig}
        columns={columns}
        actionRef={actionRef}
        headerTitle="报表管理"
        cardBordered
        search={{
          labelWidth: 'auto'
        }}
        request={async (params = {}, sort, filter) => {
          console.log(params, sort, filter)
          return Promise.resolve({
            data: [{
              id: 1,
              title: 'xxx测试大屏',
              state: 'open',
              describe: '我是测试的描述哟',
              createdAt: '2020-05-26T04:25:59Z'
            }],
            total: 20,
            success: true
          });
        }}
        rowSelection={{ ...rowSelection }}
        toolBarRender={() => {
          const arr = [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary">
              添加
            </Button>]
          return arr
        }
        }
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <PopConfirm text='批量删除'
                requestName="aaa"
                params={{
                  ids: [selectedRowKeys]
                }}
                reload={actionRef.current?.reloadAndRest}></PopConfirm>
            </Space>
          );
        }}
      ></ProTable>
    </>
  )
}

export default BigScreen