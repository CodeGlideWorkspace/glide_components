import { Form } from 'antd'
import { FormManage } from './useForm'

/**
 * 嵌套于FormItem组件中可以通过该函数获取当前的form实例
 *
 * @returns undefined | FormManage
 */
export default function useFormInstance() {
  const form = Form.useFormInstance()
  if (form) {
    return new FormManage(form)
  }
}
