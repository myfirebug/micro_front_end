import {
  FC, useState
} from 'react'
import './index.scss'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IPage } from '@src/store/actionType'

// 新增页面表单
import AddOrEditPage from '../add-or-edit-page'

interface IDesignBodyLeftProps {
  pages: IPage[];
  addLargeScreenPage: (data: IPage, callback?: Function) => void;
  delLargeScreenPage: (id: string, callback?: Function) => void;
  modifyLargeScreenPage: (id: string, data: IPage, callback?: Function) => void;
}

const DesignBodyLeft: FC<IDesignBodyLeftProps> = ({
  pages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage
}) => {

  // 弹窗参数
  const [modal, setModal] = useState<any>({
    visible: false,
    title: '',
    details: {}
  })

  return (
    <div className='app-screen-disign__body--left'>
      {/* 新增编辑页面弹窗 */}
      <Modal
        title={modal.title}
        visible={modal.visible}
        footer={null}
        destroyOnClose
        onCancel={() => setModal((state: any) => ({
          ...state,
          visible: false
        }))}>
        <AddOrEditPage
          setModal={setModal}
          addLargeScreenPage={addLargeScreenPage}
          modifyLargeScreenPage={modifyLargeScreenPage}
          details={modal.details}
        />
      </Modal>
      <div className='body'>
        <Button
          type="primary"
          block
          onClick={() => setModal((state: any) => ({
            visible: true,
            title: '新增页面',
            details: {}
          }))}
          icon={<PlusOutlined />}>
          新增页面
        </Button>
      </div>
      <div className="header">页面列表</div>
      <ul className="page">
        {
          pages.map(item => (
            <li
              key={item.id}
              className="page-item">{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}
export default DesignBodyLeft