import React, { useRef } from 'react'
import RFLow from 'reactflow'
import { useMount } from 'remote:glide_components/hooks'

function ReactFlow({ children, ...props }) {
  const reactFlow = useRef(null)

  useMount(() => {
    // 移除水印
    const panel = reactFlow.current.querySelector('.react-flow__panel.react-flow__attribution')
    panel?.removeAttribute('data-message')
    panel?.querySelector('a')?.remove()
  })

  return (
    <RFLow ref={reactFlow} {...props}>
      {children}
    </RFLow>
  )
}

export default ReactFlow
