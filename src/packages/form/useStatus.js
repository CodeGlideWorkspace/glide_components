import { Form } from 'antd'

/**
 * 获取表单的校验状态
 *
 * @returns { status, errors, warnings } https://ant-design.antgroup.com/components/form-cn#formitemusestatus
 */
export default function useStatus() {
  const status = Form.Item.useStatus()
  return status
}
