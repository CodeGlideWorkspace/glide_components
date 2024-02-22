import React from 'react'
import { Dropdown as ADropdown } from 'antd'
import propTypes from 'prop-types'

import useDropdown from './useDropdown'

function Dropdown(props) {
  const { props: aProps } = useDropdown(props)
  return <ADropdown {...aProps}>{props.children}</ADropdown>
}

Dropdown.propTypes = {
  /**
   * 下拉框箭头是否显示
   */
  arrow: propTypes.bool,

  /**
   * 下拉框被遮挡时自动调整位置
   */
  autoAdjustOverflow: propTypes.bool,

  /**
   * 菜单是否禁用
   */
  disabled: propTypes.bool,

  /**
   * 菜单配置项
   */
  menu: propTypes.oneOfType([propTypes.array, propTypes.object]),

  /**
   * 显示位置
   */
  placement: propTypes.oneOf(['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),

  /**
   * 触发方式
   */
  trigger: propTypes.oneOf(['hover', 'focus', 'click', 'contextMenu']),

  /**
   * 菜单显示状态改变时调用，点击菜单按钮导致的消失不会触发
   */
  onOpenChange: propTypes.func,
}

export default Dropdown
