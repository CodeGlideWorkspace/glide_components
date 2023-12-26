import React from 'react'
import { Row as ARow } from 'antd'
import propTypes from 'prop-types'

import useRow from './useRow'

function Row(props) {
  const { props: aProps } = useRow(props)
  return <ARow {...aProps}>{props.children}</ARow>
}

Row.propTypes = {
  /**
   * 垂直对齐方式
   */
  align: propTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
  /**
   * 栅格间隔
   */
  gutter: propTypes.oneOfType([propTypes.number, propTypes.object, propTypes.array]),
  /**
   * 水平排列方式
   */
  justify: propTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly']),
  /**
   * 是否自动换行
   */
  wrap: propTypes.bool,
}

export default Row
