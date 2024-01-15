import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { Layout as ALayout } from 'antd'

import useSider from './useSider'
import Trigger from './Trigger'

import styles from './Sider.module.less'

function Sider(props) {
  const { props: aProps, triggerProps, collapsed, direction } = useSider(props)

  return (
    <ALayout.Sider {...aProps}>
      {props.collapsible && (
        <Trigger
          className={classNames(styles.trigger, {
            [styles.left]: direction === 'left',
            [styles.right]: direction === 'right',
            [styles.collapsed]: collapsed,
          })}
          {...triggerProps}
        />
      )}
      {props.children}
    </ALayout.Sider>
  )
}

Sider.defaultProps = {
  direction: 'left',
  onCollapse: () => {},
}

Sider.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 是否可收起
   */
  collapsible: propTypes.bool,

  /**
   * 收起状态
   */
  collapsed: propTypes.bool,

  /**
   * 默认收起状态
   */
  defaultCollapsed: propTypes.bool,

  /**
   * 面板宽度
   */
  width: propTypes.number,

  /**
   * 面板收起的宽度
   */
  collapsedWidth: propTypes.number,

  /**
   * 面板为于左侧还是右侧
   */
  direction: propTypes.oneOf(['left', 'right']),

  /**
   * 折叠动作回调函数
   */
  onCollapse: propTypes.func,
}

export default Sider
