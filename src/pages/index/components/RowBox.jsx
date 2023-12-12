import React from 'react'

import { Col, Row } from '@/packages/grid'
import { Droppable } from '@/packages/dnd'
import EmptyBox from './EmptyBox'
function RowBox({ children, type, id, handleDropInner }) {
  const hasChildren = children && children.length > 0
  if (hasChildren) {
    return <Row key={id}>{children}</Row>
  }

  return (
    <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module', 'col']}>
      <Row key={id}>
        <Col span={24}>
          <EmptyBox text="请拖入【col】组件" />
        </Col>
      </Row>
    </Droppable>
  )
}

export default RowBox
