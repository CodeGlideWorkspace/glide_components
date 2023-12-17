import React from 'react'

import { Col } from '@/packages/grid'
import { Droppable } from '@/packages/dnd'
import EmptyBox from './EmptyBox'
function EditorCol({ children, type, id, handleDropInner }) {
  const hasChildren = children && children.length > 0
  return (
    <Col span={24}>
      <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
        {hasChildren ? children : <EmptyBox text="请拖入【module】组件" />}
      </Droppable>
    </Col>
  )
}

export default EditorCol
