import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { LeftOutlined, RightOutlined } from 'remote:glide_components/Icon'
import { theme } from 'remote:glide_components/ConfigProvider'

import styles from './Trigger.module.less'

function Trigger({ direction, className, style, onClick }) {
  const { token } = theme.useToken()

  return (
    <div
      style={{ borderColor: token.colorBorderSecondary, borderRadius: token.borderRadius, ...style }}
      className={classNames(styles.trigger, className)}
      onClick={onClick}
    >
      {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
    </div>
  )
}

Trigger.defaultProps = {
  direction: 'left',
}

Trigger.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 箭头方向
   */
  direction: propTypes.oneOf(['left', 'right']),

  /**
   * 点击回调事件
   */
  onClick: propTypes.func,
}

export default Trigger
