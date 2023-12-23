import React, { forwardRef } from 'react'
import { Switch as ASwitch } from 'antd'
import propTypes from 'prop-types'

import useSwitch from './useSwitch'

const Switch = forwardRef(function (props, ref) {
  const { props: aProps, ref: aRef } = useSwitch(props)
  return <ASwitch ref={aRef} {...aProps} />
})

Switch.defaultProps = {
  onChange() {},
}

Switch.propTypes = {
  /**
   * 是否自动聚焦
   */
  autoFocus: propTypes.bool,

  /**
   * 开关值
   */
  value: propTypes.bool,

  /**
   * 开关默认值
   */
  defaultValue: propTypes.bool,

  /**
   * 是否禁用
   */
  disabled: propTypes.bool,

  /**
   * 变更回调函数
   */
  onChange: propTypes.func,
}

export default Switch
