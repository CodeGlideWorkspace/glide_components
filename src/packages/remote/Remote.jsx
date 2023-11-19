import React, { Suspense } from 'react'

import useRemote from './useRemote'

function Remote({ path, props }) {
  const { Component, status } = useRemote({ path })

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

export default Remote
