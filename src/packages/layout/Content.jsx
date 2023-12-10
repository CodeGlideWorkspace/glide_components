import React from 'react'
import propTypes from 'prop-types'
import { Layout as ALayout } from 'antd'

function Content({ style, className, children }) {
  return (
    <ALayout.Content style={style} className={className}>
      {children}
    </ALayout.Content>
  )
}

Content.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,
}

export default Content
