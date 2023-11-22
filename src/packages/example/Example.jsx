import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Library from '@/packages/example/Library'
import Canvas from '@/packages/example/Canvas'
export default function Example() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>
          <h2>组件</h2>
          <Library></Library>
        </div>
        <div>
          <h2>画布</h2>
          <Canvas></Canvas>
        </div>
        <div>配置</div>
      </div>
    </DndProvider>
  )
}
