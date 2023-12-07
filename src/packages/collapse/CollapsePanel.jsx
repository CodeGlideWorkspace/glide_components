import React from 'react'
import propTypes from 'prop-types'

function CollapsePanel({ children }) {
  return <div>{children}</div>
}

CollapsePanel.displayName = 'CollapsePanel'

CollapsePanel.propTypes = {
  /**
   * 面板名称
   */
  name: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,

  /**
   * 面板标题
   */
  title: propTypes.string,

  /**
   * 面板动作区
   */
  action: propTypes.element,

  /**
   * 样式设置
   */
  style: propTypes.object,
}

export default CollapsePanel
