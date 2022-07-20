import React, {
  FC
} from 'react'
import { Pagination } from 'antd'
import './index.scss'

interface IPaginationProps {
  total: number;
  params: any;
  setParams: React.Dispatch<any>
}

const CustomPagination: FC<IPaginationProps> = ({
  total,
  setParams,
  params
}) => {
  return (
    <div className="app-pagination">
      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        current={params.page}
        onChange={(page, pageSize) => setParams((state: any) => ({
          ...state,
          page: page,
          size: pageSize
        }))}
        onShowSizeChange={(page, pageSize) => setParams((state: any) => ({
          ...state,
          page: page,
          size: pageSize
        }))}
        pageSize={params.size}
        showTotal={total => `共 ${total} 条记录`}
      />
    </div>
  )
}

export default CustomPagination