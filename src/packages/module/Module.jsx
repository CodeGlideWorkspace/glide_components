import React from 'react'
import { Card as ACard } from 'antd'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { theme } from 'remote:glide_components/ConfigProvider'

import useModule from './useModule'

import styles from './Module.module.less'

function Module(props) {
  const { token } = theme.useToken()
  const { props: aProps } = useModule(props)

  const { head: headStyle, body: bodyStyle } = props.styles

  return (
    <ACard
      className={classNames(styles.module, props.className)}
      headStyle={{ border: 'none', ...headStyle }}
      bodyStyle={{
        flex: '1 1 auto',
        overflow: 'auto',
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        ...bodyStyle,
      }}
      {...aProps}
    >
      {props.children}
    </ACard>
  )
}

Module.defaultProps = {
  bordered: false,
  styles: {},
}

Module.propTypes = {
  className: propTypes.string,
  style: propTypes.string,

  styles: propTypes.exact({
    head: propTypes.object,
    body: propTypes.object,
  }),

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
  action: propTypes.element,
}

export default Module
