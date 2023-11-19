import React from 'react'

import styles from './CollapsePanel.module.less'

function CollapsePanel({ children }) {
  return <div className={styles.panel}>{children}</div>
}

CollapsePanel.displayName = 'CollapsePanel'

export default CollapsePanel
