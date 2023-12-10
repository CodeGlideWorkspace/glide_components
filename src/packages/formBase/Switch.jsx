import React from 'react'
import { Switch as ASwitch } from 'antd'
import propTypes from 'prop-types'

import useSwitch from './useSwitch'

function Switch(props) {
  const { props: aProps } = useSwitch(props)
  return <ASwitch {...aProps} />
}

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
