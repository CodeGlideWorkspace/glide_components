import React from 'react'
import { Card as ACard } from 'antd'
import propTypes from 'prop-types'

import useModule from './useModule'

function Module(props) {
  const { props: aProps } = useModule(props)
  return <ACard {...aProps}>{props.children}</ACard>
}

Module.propTypes = {
  /**
   * 卡片的标题
   */
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),

  /**
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 面板动作区
   */
  action: propTypes.oneOfType([propTypes.string, propTypes.element]),
}

export default Module
