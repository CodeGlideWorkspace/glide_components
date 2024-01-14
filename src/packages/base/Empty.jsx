import React from 'react'
import { Empty as AEmpty } from 'antd'
import propTypes from 'prop-types'
import { classNames } from 'remote:glide_components/utils'

import styles from './Empty.module.less'

function Empty({ className, style, image, description }) {
  return (
    <AEmpty className={classNames(styles.empty, { className })} style={style} image={image} description={description} />
  )
}

Empty.defaultProps = {
  image: AEmpty.PRESENTED_IMAGE_SIMPLE,
  description: '暂无数据',
}

Empty.propTypes = {
  className: propTypes.string,
  style: propTypes.string,

  /**
   * 空状态的图片定义
   */
  image: propTypes.oneOfType([propTypes.string, propTypes.element]),

  /**
   * 空状态的文案描述
   */
  description: propTypes.oneOfType([propTypes.string, propTypes.element]),
}

export default Empty
