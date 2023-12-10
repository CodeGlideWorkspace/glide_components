import React from 'react'
import propTypes from 'prop-types'

function TabPanel({ className, children }) {
  return <div className={className}>{children}</div>
}

TabPanel.displayName = 'TabPanel'

TabPanel.propTypes = {
  /**
   * 页签名字
   */
  name: propTypes.string,

  /**
   * 页签标题
   */
  title: propTypes.string,

  /**
   * 禁用
   */
  disabled: propTypes.bool,

  className: propTypes.string,
}

export default TabPanel
