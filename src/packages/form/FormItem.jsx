import React from 'react'
import propTypes from 'prop-types'
import { Form as AForm } from 'antd'

import useAItem from './useAItem'

function FormItem(props) {
  const { props: aProps, children } = useAItem(props)
  return <AForm.Item {...aProps}>{children}</AForm.Item>
}

FormItem.propTypes = {
  /**
   * 表单项名称
   */
  name: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),

  /**
   * 是否必填
   */
  required: propTypes.bool,

  /**
   * 设置依赖字段
   */
  dependencies: propTypes.arrayOf(propTypes.string),

  /**
   * 表单项描述信息
   */
  description: propTypes.string,

  /**
   * 表单项提示信息
   */
  tooltip: propTypes.string,

  /**
   * 是否隐藏字段
   */
  hidden: propTypes.bool,

  /**
   * label文本
   */
  label: propTypes.string,

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
   * 判断表单是否有变化
   * (prevValues, currValues) => boolean
   */
  shouldUpdate: propTypes.oneOfType([propTypes.func, propTypes.bool]),

  /**
   * 无样式表单项，仅作为容器使用
   */
  noStyle: propTypes.bool,

  /**
   * 自定义校验函数
   */
  validators: propTypes.arrayOf(propTypes.func),
}

export default FormItem
