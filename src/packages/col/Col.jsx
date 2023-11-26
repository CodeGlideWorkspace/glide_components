import React from 'react'
import { Col as ACol } from 'antd'
import propTypes from 'prop-types'

import useCol from './useCol'

function Col(props) {
  const { props: aProps } = useCol(props)
  return <ACol {...aProps}>{props.children}</ACol>
}

Col.propTypes = {
  /**
   * 栅格占位格数
   */
  span: propTypes.number,
  /**
   * 栅格向右移动的格数
   */
  push: propTypes.number,
  /**
   * 栅格向左移动的格数
   */
  pull: propTypes.number,
  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   */
  offset: propTypes.number,
  /**
   * 栅格顺序
   */
  order: propTypes.number,
  /**
   * flex 布局属性
   */
  flex: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * <576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xs: propTypes.number,
  /**
   * ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  sm: propTypes.number,
  /**
   * ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  md: propTypes.number,
  /**
   * ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  lg: propTypes.number,
  /**
   * ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xl: propTypes.number,
  /**
   * ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xxl: propTypes.number,
}

export default Col
