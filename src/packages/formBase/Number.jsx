import React, { forwardRef } from 'react'
import { InputNumber as AInputNumber } from 'antd'
import propTypes from 'prop-types'

import useNumber from './useNumber'

const Number = forwardRef(function Number(props, ref) {
  const { props: aProps, ref: aRef } = useNumber(props, ref)

  return <AInputNumber ref={aRef} {...aProps} />
})

Number.defaultProps = {
  placeholder: '请输入',
  onChange() {},
  onStep() {},
  onEnter() {},
}

Number.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 前缀内容
   */
  prefix: propTypes.element,

  /**
   * 是否自动聚焦
   */
  autoFocus: propTypes.bool,

  /**
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 是否显示上下控制按钮
   */
  control: propTypes.bool,

  /**
   * 占位符
   */
  placeholder: propTypes.string,

  /**
   * 输入框值
   */
  value: propTypes.number,

  /**
   * 输入框默认值
   */
  defaultValue: propTypes.number,

  /**
   * 是否禁用
   */
  disabled: propTypes.bool,

  /**
   * 最小值
   */
  min: propTypes.number,

  /**
   * 最大值
   */
  max: propTypes.number,

  /**
   * 精度
   */
  precision: propTypes.number,

  /**
   * 步长
   */
  step: propTypes.number,

  /**
   * 点击上下箭头的回调函数
   */
  onStep: propTypes.func,

  /**
   * 失焦事件
   */
  onBlur: propTypes.func,

  /**
   * 聚焦事件
   */
  onFocus: propTypes.func,

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

export default Number
