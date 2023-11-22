import React from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// import { Card } from '@/packages/card'

import { Container } from './Container'

export default function StageProvider() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Container title="stage demo">1212</Container>
      </div>
    </DndProvider>
  )
}
