import React from 'react'
import propTypes from 'prop-types'
import { Layout as ALayout } from 'antd'
import { theme } from 'remote:glide_components/ConfigProvider'

function Header({ style, className, children }) {
  const { token } = theme.useToken()
  return (
    <ALayout.Header
      style={{
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: 0,
        ...style,
      }}
      className={className}
    >
      {children}
    </ALayout.Header>
  )
}

Header.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,
}

export default Header
