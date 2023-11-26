import React from 'react'
import { Collapse as ACollapse } from 'antd'
import propTypes from 'prop-types'

import useCollapse from './useCollapse'

function Collapse(props) {
  const { props: aProps } = useCollapse(props)
  return <ACollapse ghost {...aProps} />
}

Collapse.propTypes = {
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
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 面板展开状态变更事件
   * (value: string | string[]) => void
   */
  onChange: propTypes.func,
}

export default Collapse
