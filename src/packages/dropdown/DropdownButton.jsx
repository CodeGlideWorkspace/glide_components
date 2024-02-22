import React from 'react'
import { Dropdown as ADropdown } from 'antd'
import propTypes from 'prop-types'

import useDropdownButton from './useDropdownButton'

function DropdownButton(props) {
  const { props: aProps } = useDropdownButton(props)
  return <ADropdown.Button {...aProps}>{props.children}</ADropdown.Button>
}

DropdownButton.propTypes = {
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

  /**
   * 设置按钮载入状态
   */
  loading: propTypes.oneOfType([propTypes.bool, propTypes.object]),
  /**
   * 设置危险按钮
   */
  danger: propTypes.bool,
  /**
   * 右侧的 icon
   */
  icon: propTypes.node,
  /**
   * 按钮大小，和 Button 一致
   */
  siz: propTypes.oneOf(['small', 'middle', 'large']),
  /**
   * 按钮类型，和 Button 一致
   */
  type: propTypes.oneOf(['primary', 'dashed', 'text', 'link', 'default']),
  /**
   * 点击左侧按钮的回调，和 Button 一致
   */
  onClick: propTypes.func,
}

export default DropdownButton
