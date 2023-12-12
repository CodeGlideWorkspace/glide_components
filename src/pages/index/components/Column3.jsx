import React from 'react'
import { Col, Row } from '@/packages/grid'
import { Droppable } from '@/packages/dnd'
import EmptyBox from './EmptyBox'
function Column3({ id, type, children, handleDropInner }) {
  const hasChildren = children && children.length > 0
  return (
    <Row key={id}>
      <Col span={8}>
        <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
          {!hasChildren ? <EmptyBox /> : children[0]}
        </Droppable>
      </Col>
      <Col span={8}>
        <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
          {!hasChildren || !children[1] ? <EmptyBox /> : children[1]}
        </Droppable>
      </Col>
      <Col span={8}>
        <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
          {!hasChildren || !children[2] ? <EmptyBox /> : children[2]}
        </Droppable>
      </Col>
    </Row>
  )
}

export default Column3
