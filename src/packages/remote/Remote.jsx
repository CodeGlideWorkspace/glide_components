import React, { Suspense, forwardRef } from 'react'
import propTypes from 'prop-types'

import { useRemote, parsePath } from './useRemote'

const Remote = forwardRef(function ({ $$path, $$forwardRef, children, ...props }, ref) {
  const { Component, status } = useRemote(parsePath($$path), $$forwardRef)

  function renderComponent() {
    // TODO 优化显示效果
    if (status === 'failed') {
      return '组件加载失败'
    }

    if (!Component) {
      return null
    }

    const refs = {}
    if (ref) {
      refs.ref = ref
    }

    return (
      <Component {...refs} {...props}>
        {children}
      </Component>
    )
  }

  // TODO 优化loading显示效果
  return <Suspense fallback="loading">{renderComponent()}</Suspense>
})

Remote.propTypes = {
  /**
   * 远程组件的导入路径
   */
  $$path: propTypes.shape({
    path: propTypes.string.isRequired,
    exportName: propTypes.string,
  }),
  /**
   * 是否自动包裹forwardRef
   */
  $$forwardRef: propTypes.bool,
}

export default Remote
