import React from 'react'
import { Collapse as ACollapse } from 'antd'
import propTypes from 'prop-types'

import useCollapse from './useCollapse'

function Collapse(props) {
  const { props: aProps } = useCollapse(props)
  return <ACollapse {...aProps} />
}

Collapse.defaultProps = {
  bordered: true,
  collapsible: true,
  mode: 'header',
}

Collapse.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 设置展开的面板
   */
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),

  /**
   * 设置默认展开的面板
   */
  defaultValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),

  /**
   * 面板是否可折叠
   */
  collapsible: propTypes.bool,

  /**
   * 折叠模式
   */
  mode: propTypes.oneOf(['header', 'icon']),

  /**
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 面板隐藏时卸载组件
   */
  destroyInactivePanel: propTypes.bool,

  /**
   * 面板展开状态变更事件
   * (value: string | string[]) => void
   */
  onChange: propTypes.func,
}

export default Collapse
