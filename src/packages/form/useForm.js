import { useRef } from 'react'
import { Form } from 'antd'
import { EventEmitter } from 'remote:glide_components/utils'

export class FormManage {
  form = null

  subscriber = new EventEmitter()

  constructor(form) {
    if (!form) {
      throw new Error('FormManage constructor(form): form is required')
    }

    this.form = form
  }

  /**
   * 获取antd的原始form实例
   */
  getForm() {
    return this.form
  }

  /**
   * 表单提交
   */
  submit() {
    this.form.submit()
  }

  /**
   * 重置表单
   */
  reset() {
    this.form.resetFields()
  }

  /**
   * 获取表单项的值
   */
  getValue(name) {
    return this.form.getFieldValue(name)
  }

  /**
   * 设置表单项的值
   */
  setValue(name, value) {
    this.form.setFieldValue(name, value)
    this.subscriber.emit('setValue', name, value)
  }

  /**
   * 获取表单值
   */
  getValues(names) {
    return this.form.getFieldsValue(names)
  }

  /**
   * 设置表单值
   */
  setValues(values) {
    this.form.setFieldsValue(values)
    this.subscriber.emit('setValues', values)
  }

  /**
   * 验证表单
   */
  validate(nameList, option) {
    return this.form.validateFields(nameList, option).catch((e) => {
      if (e?.errorFields?.length) {
        throw e
      }

      return e.values
    })
  }
}

/**
 * 创建表单状态管理实例，用于表单的控制逻辑
 */
export default function useForm() {
  const [form] = Form.useForm()
  const formManage = useRef(null)

  if (!formManage.current) {
    formManage.current = new FormManage(form)
  }

  return formManage.current
}
