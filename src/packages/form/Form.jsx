import React from 'react'
import propTypes from 'prop-types'
import { Form as AForm } from 'antd'

import useAForm from './useAForm'

function Form(props) {
  const { props: aProps } = useAForm(props)
  return <AForm {...aProps}>{props.children}</AForm>
}

Form.propTypes = {
  /**
   * 表单的布局
   */
  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']),
  /**
   * 表单禁用
   */
  disabled: propTypes.bool,

  /**
   * 表单的初始值
   */
  initialValues: propTypes.object,

  /**
   * 表单label的对齐方式
   */
  labelAlign: propTypes.oneOf(['left', 'right']),

  /**
   * 表单label的栅格配置
   * 查看antd的响应式设计文档https://ant-design.antgroup.com/components/grid-cn#col
   */
  labelCol: propTypes.object,

  /**
   * 表单控件的栅格配置
   * 查看antd的响应式设计文档https://ant-design.antgroup.com/components/grid-cn#col
   */
  wrapperCol: propTypes.object,

  /**
   * 表单提交事件
   * (values) => void
   */
  onSubmit: propTypes.func,

  /**
   * 表单值改变事件
   * (values: object) => void
   */
  onChange: propTypes.func,
}

export default Form
