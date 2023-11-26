import React, { forwardRef } from 'react'
import { Input as AInput } from 'antd'
import propTypes from 'prop-types'

import useInput from './useInput'

const Input = forwardRef(function Input(props, ref) {
  const { props: aProps, ref: aRef } = useInput(props, ref)

  if (props.type === 'textarea') {
    return <AInput.TextArea ref={aRef} {...aProps} />
  }

  if (props.type === 'password') {
    return <AInput.Password ref={aRef} {...aProps} />
  }

  return <AInput ref={aRef} {...aProps} />
})

Input.propTypes = {
  /**
   * 输入框类型
   */
  type: propTypes.oneOf(['textarea', 'password', 'text']),

  /**
   * 占位符
   */
  placeholder: propTypes.string,

  /**
   * 前缀内容
   */
  prefix: propTypes.element,

  /**
   * 后缀内容
   */
  suffix: propTypes.element,

  /**
   * 是否可清空
   */
  clearable: propTypes.bool,

  /**
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 输入框值
   */
  value: propTypes.string,

  /**
   * 输入框默认值
   */
  defaultValue: propTypes.string,

  /**
   * 是否禁用
   */
  disabled: propTypes.bool,

  /**
   * 最大输入长度
   */
  maxLength: propTypes.number,

  /**
   * 是否显示字数统计
   */
  showCount: propTypes.bool,

  /**
   * 仅当类型为textarea时生效
   */
  rowSize: propTypes.oneOfType([propTypes.bool, propTypes.exact({ min: propTypes.number, max: propTypes.number })]),

  /**
   * 值变更事件
   * (value: string) => void
   */
  onChange: propTypes.func,

  /**
   * 回车事件
   * (value: string) => void
   */
  onEnter: propTypes.func,
}

export default Input
