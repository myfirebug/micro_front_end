import {
  FC, useCallback, useEffect, useRef
} from 'react'
import { IAnyObject } from '@src/types'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

interface IJsonEditorProps {
  value: IAnyObject;
  onChange?: (josn?: any) => void;
  options?: JSONEditorOptions;
}

const JsonEditor: FC<IJsonEditorProps> = ({
  value,
  onChange,
  options = {}
}) => {
  const editorRef = useRef<any>(null)
  const editorObj = useRef<any>(null)

  // 数据变化时
  const changeHandle = useCallback((value: any) => {
    try {
      const currenValue = value === '' ? null : editorObj.current.get();
      onChange && onChange(currenValue);
    } catch (err) {
      //
    }
  }, [onChange])

  // 初始化JOSN编辑器
  const initEditor = useCallback(() => {
    if (!editorObj.current) {
      const totalOptions: JSONEditorOptions = {
        mode: 'code',
        onChangeText: changeHandle,
        theme: "",
        ...options
      }
      editorObj.current = new JSONEditor(editorRef.current, totalOptions)
    }
  }, [changeHandle, options])

  useEffect(() => {
    initEditor()
  }, [initEditor])

  // 监听外部传入的value
  useEffect(() => {
    try {
      if (value) {
        editorObj.current.update(value)
      }
    } catch (error) {
      // 当编辑器内容为空时，editorObj.current.get()会抛出异常，所以这里需要捕获
    }
  }, [value])

  return (
    <div ref={editorRef} className="app-json-editor"></div>
  )
}

export default JsonEditor