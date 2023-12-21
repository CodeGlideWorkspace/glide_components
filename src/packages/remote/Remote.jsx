import React, { Suspense } from 'react'
import propTypes from 'prop-types'

import { useRemote, parsePath } from './useRemote'

function Remote({ $$path, ...props }) {
  const { Component, status } = useRemote(parsePath($$path))

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

Remote.propTypes = {
  /**
   * 远程组件的导入路径
   */
  $$path: propTypes.shape({
    path: propTypes.string.isRequired,
    exportName: propTypes.string,
  }),
}

export default Remote
