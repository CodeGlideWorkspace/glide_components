import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default ({ options, children }) => {
  return (
    <DndProvider backend={HTML5Backend} options={options}>
      {children}
    </DndProvider>
  )
}
