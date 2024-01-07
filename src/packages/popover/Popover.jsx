import React from 'react'
import { Popover as APopover } from 'antd'
import propTypes from 'prop-types'

import usePopover from './usePopover'

function Popover(props) {
  const { props: aProps } = usePopover(props)
  return <APopover {...aProps}>{props.children}</APopover>
}

Popover.propTypes = {
  /**
   * 是否显示箭头
   */
  arrow: propTypes.bool,

  /**
   * 背景颜色
   */
  background: propTypes.string,

  /**
   * 隐藏时是否销毁
   */
  destroyInactive: propTypes.bool,

  /**
   * 鼠标移入时显示延迟
   */
  mouseEnterDelay: propTypes.number,

  /**
   * 鼠标移出时隐藏延迟
   */
  mouseLeaveDelay: propTypes.number,

  /**
   * 显示位置
   */
  placement: propTypes.oneOf([
    'top',
    'left',
    'right',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom',
  ]),

  /**
   * 触发方式
   */
  trigger: propTypes.oneOf(['hover', 'focus', 'click', 'contextMenu']),

  /**
   * 主动控制显示/隐藏
   */
  visible: propTypes.bool,

  zIndex: propTypes.number,

  title: propTypes.element,

  content: propTypes.element,

  /**
   * 显示/隐藏状态变更
   */
  onChange: propTypes.func,
}

Popover.defaultProps = {
  onChange() {},
}

export default Popover
