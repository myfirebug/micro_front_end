import {
  FC,
  useEffect,
  useState
} from 'react'
import { Upload, Button, message, Modal } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import Ajax from '@src/service'

/**
 * uid: guid(),
 * name: 'image.png',
 * status: 'done',
 * url: data.appLogo
 */
interface ICustomUploadProps {
  // 默认值 
  defaultFileList?: any[];
  // 后缀
  accept?: string;
  // 最大数
  maxCount?: number;
  // 显示的文本
  text?: string;
  // 是否是图片
  isPicture?: boolean;
  // 变化时
  onFileChange: (files: any[]) => void;
}

const CustomUpload: FC<ICustomUploadProps> = ({
  accept,
  maxCount = 1,
  text = '上传图片',
  isPicture = true,
  defaultFileList = [],
  onFileChange
}) => {
  // 当前图片地址
  const [previewImage, setPreviewImage] = useState<string>('')
  // 显示图片预览弹窗
  const [previewVisible, setPreviewVisible] = useState(false)
  // 图片列表
  const [fileList, setFileList] = useState<any[]>([])
  useEffect(() => {
    if (defaultFileList.length) {
      setFileList(defaultFileList)
    }
  }, [defaultFileList])
  // 上传数据变化时
  const handleChange = (file: any) => {
    console.log(file, 'filefilefile')
    setFileList(file.fileList)
    onFileChange(file.fileList)
  }
  // 转化成base64
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  // 预览
  const onPreview = async (file: any) => {
    if (isPicture) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewVisible(true)
      setPreviewImage(file.url || file.preview)
    }
  }
  // 上传传之前的限制
  const beforeUpload = (file: any, size: number) => {
    const isLt = file.size / 1024 / 1024 < size;
    if (!isLt) message.error('图片必须小于1MB!')
  }
  // 基础的上传组件
  const uploadBase = () => {
    return (
      <Upload
        accept={accept}
        fileList={fileList}
        listType="picture-card"
        onChange={file => handleChange(file)}
        onPreview={onPreview}
        customRequest={e => {
          const params = new FormData()
          params.append('file', e.file)
          Ajax.upload(params).then(res => {
            const { data, success } = res
            if (success) {
              e.onSuccess!(data)
              message.success('上传成功')
            }
          }).catch(err => {
            e.onError!(err);
          })
        }}
      >
        {
          fileList.length >= maxCount ?
            null :
            isPicture ?
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{text}</div>
              </div> :
              <Button icon={<UploadOutlined />} className='upload'>{text}</Button>
        }
      </Upload>
    )
  }
  return (
    <>
      <Modal
        visible={previewVisible}
        title="图片预览"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {
        isPicture ?
          <ImgCrop rotate>
            {uploadBase()}
          </ImgCrop> :
          <>
            {uploadBase()}
          </>
      }
    </>
  )
}

export default CustomUpload