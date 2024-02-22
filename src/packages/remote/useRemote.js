import { forwardRef, lazy, useState, useEffect } from 'react'
import { isObject } from 'remote:glide_components/utils'

import loadRemote from './loadRemote'

export function parsePath(remoteDefinition) {
  if (!remoteDefinition) {
    return {}
  }

  return {
    path: isObject(remoteDefinition) ? remoteDefinition.path : remoteDefinition,
    exportName: isObject(remoteDefinition) ? remoteDefinition.exportName : 'default',
  }
}

export function useRemote({ path, exportName }, isForwardRef) {
  const [Component, setComponent] = useState(null)
  const [status, setStatus] = useState('pending')

  async function loadComponent() {
    if (!path) {
      setStatus('failed')
      return
    }
    try {
      const Com = lazy(() =>
        loadRemote(path).then((module) => {
          const exportModule = module[exportName]
          if (exportModule.$$typeof) {
            return { default: exportModule }
          }

          return { default: isForwardRef ? forwardRef(exportModule) : exportModule }
        }),
      )
      setComponent(Com)
      setStatus('succeed')
    } catch (e) {
      setStatus('failed')
      console.error(e)
    }
  }

  useEffect(() => {
    loadComponent()
  }, [path])

  return { Component, status }
}
