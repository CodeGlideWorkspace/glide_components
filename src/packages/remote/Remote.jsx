import React, { Suspense } from 'react'
import propTypes from 'prop-types'

import useRemote from './useRemote'

function Remote({ $$path, $$exportName, ...props }) {
  const { Component, status } = useRemote({ path: $$path, exportName: $$exportName })

  function renderComponent() {
    // TODO 优化显示效果
    if (status === 'failed') {
      return '组件加载失败'
    }

    return Component ? <Component {...props} /> : null
  }

  // TODO 优化loading显示效果
  return <Suspense fallback="loading">{renderComponent()}</Suspense>
}

Remote.defaultProps = {
  $$path: '',
}

Remote.propTypes = {
  /**
   * 远程组件的导入路径
   */
  $$path: propTypes.string.isRequired,

  /**
   * 远程组件导出名字
   */
  $$exportName: propTypes.string,
}

export default Remote
