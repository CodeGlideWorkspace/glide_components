import { lazy, useState, useEffect } from 'react'

import { loadRemoteModule } from 'doer'

function useRemote({ path, exportName }) {
  const [Component, setComponent] = useState(null)
  const [status, setStatus] = useState('pending')

  /**
   * path的格式案例
   *
   * remote:[scope][module]
   *
   * eg: remote:glide_components/Input
   *
   * scope => glide_component
   * module => ./Input
   */
  const [scope, ...parts] = path.replace('remote:', '').split('/')
  const module = `./${parts.filter(Boolean).join('/')}`

  async function loadComponent() {
    if (!path) {
      setStatus('failed')
      return
    }
    try {
      const Com = lazy(() =>
        loadRemoteModule(scope, module).then((m) => {
          return { default: m[exportName] }
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

export default useRemote
