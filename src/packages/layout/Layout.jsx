import React from 'react'
import propTypes from 'prop-types'
import { Layout as ALayout } from 'antd'

function Layout({ style, className, children }) {
  return (
    <ALayout style={style} className={className}>
      {children}
    </ALayout>
  )
}

Layout.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,
}

export default Layout
