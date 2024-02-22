import React from 'react'
import { Button as AButton } from 'antd'
import propTypes from 'prop-types'

import useButton from './useButton'

function Button(props) {
  const { props: aProps } = useButton(props)
  return <AButton {...aProps}>{props.children}</AButton>
}

Button.defaultProps = {
  type: 'default',
}

Button.propTypes = {
  style: propTypes.object,
  className: propTypes.object,
  /**
   * 按钮类型
   */
  type: propTypes.oneOf(['primary', 'dashed', 'link', 'text', 'default']),

  block: propTypes.bool,

  /**
   * 加载状态
   */
  loading: propTypes.oneOfType([propTypes.bool, propTypes.exact({ delay: propTypes.number })]),

  /**
   * 禁用
   */
  disabled: propTypes.bool,

  /**
   * 按钮图标
   */
  icon: propTypes.element,

  onClick: propTypes.func,
}

export default Button
