import { Form } from 'antd'

/**
 * 监听表单的值变化
 *
 * @param {string | number | (string | number)[]} name 表单项名称
 * @param {FormManage} formManage 表单状态管理实例
 *
 * @returns FormManage
 */
export default function useWatch(name, formManage) {
  const form = formManage?.getForm()
  const result = Form.useWatch(name, form)
  return result
}
