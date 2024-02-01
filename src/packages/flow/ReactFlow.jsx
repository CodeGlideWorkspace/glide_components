import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import RFLow from 'reactflow'
import { useMount } from 'remote:glide_components/hooks'

const ReactFlow = forwardRef(function ({ children, ...props }, ref) {
  const flowRef = useRef(null)

  useImperativeHandle(ref, () => flowRef.current)

  useMount(() => {
    // 移除水印
    const panel = flowRef.current.querySelector('.react-flow__panel.react-flow__attribution')
    panel?.removeAttribute('data-message')
    panel?.querySelector('a')?.remove()
  })

  return (
    <RFLow ref={flowRef} {...props}>
      {children}
    </RFLow>
  )
})

export default ReactFlow
