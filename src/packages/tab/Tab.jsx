import React from 'react'
import { Tabs as ATabs } from 'antd'
import propTypes from 'prop-types'

import useTab from './useTab'

function Tab(props) {
  const { props: aProps } = useTab(props)
  return <ATabs {...aProps} />
}

Tab.defaultProps = {
  onChange() {},
}

Tab.propTypes = {
  /**
   * tab的值
   */
  value: propTypes.string,

  /**
   * tab默认值
   */
  defaultValue: propTypes.string,

  className: propTypes.string,

  /**
   * 标签居中显示
   */
  centered: propTypes.bool,

  /**
   * 面板动作区
   */
  action: propTypes.element,

  /**
   * 面板隐藏时卸载组件
   */
  destroyInactivePanel: propTypes.bool,

  /**
   * 页签切换回调函数
   */
  onChange: propTypes.func,
}

export default Tab
