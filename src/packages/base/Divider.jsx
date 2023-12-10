import React from 'react'
import propTypes from 'prop-types'
import { Divider as ADivider } from 'antd'

import useDivider from './useDivider'

function Divider(props) {
  const { props: aProps } = useDivider(props)

  return <ADivider {...aProps}>{props.children}</ADivider>
}

Divider.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 是否虚线
   */
  dashed: propTypes.bool,

  /**
   * 标题的对齐方式
   */
  orientation: propTypes.oneOf(['left', 'right', 'center']),

  /**
   * 标题的间距
   */
  offset: propTypes.oneOfType([propTypes.string, propTypes.number]),

  /**
   * 布局方向
   */
  layout: propTypes.oneOf(['horizontal', 'vertical']),
}

export default Divider
