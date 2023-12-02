import React from 'react'
import propTypes from 'prop-types'
import { Layout as ALayout } from 'antd'
import { theme } from 'remote:glide_components/ConfigProvider'

function Footer({ style, className, children }) {
  const { token } = theme.useToken()
  return (
    <ALayout.Footer
      style={{
        background: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        padding: 0,
        ...style,
      }}
      className={className}
    >
      {children}
    </ALayout.Footer>
  )
}

Footer.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,
}

export default Footer
