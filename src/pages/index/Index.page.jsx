import React from 'react'

import styles from './Index.module.css'
import { Col } from '@/packages/col'
import { Row } from '@/packages/row'
import { Module } from '@/packages/module'
import { Button } from '@/packages/button'
import { DndContainer, Droppable, Draggable } from '@/packages/dnd'
const genUUID = () => {
  return Math.random().toString(36).substr(2)
}
export default function Index() {
  const [box2, setBox2] = React.useState([
    {
      id: '1',
      type: 'row', // 'module' | 'row
      name: 'row1',
      slots: [
        {
          id: '2',
          type: 'module',
          name: 'module1',
        },
      ],
    },
  ])
  const handleDrag = (item, monitor) => {
    console.log(item, monitor)
  }
  const handleDrop = (item, monitor) => {
    console.log(item, monitor)
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return [...box2, item]
    })
  }
  const emptyBox = () => {
    return <div style={{ minHeight: '20px' }}>请拖入组件</div>
  }
  const rowBox = ({ children, type, id }) => {
    const hasChildren = children && children.length > 0
    return (
      <Row key={id}>
        <Col span={24}>{!hasChildren ? emptyBox() : children}</Col>
      </Row>
    )
  }
  const moduleBox = ({ name, id, children }) => {
    return (
      <Module title="1111" key={id}>
        {name}
        {children}
      </Module>
    )
  }
  const renderDropContent = (item) => {
    const { type, slots } = item
    let children = []
    if (slots && slots.length > 0) {
      children = slots.map((child) => renderDropContent(child))
    }
    if (type === 'module') {
      return moduleBox({ ...item, children })
    }
    if (type === 'row') {
      return rowBox({ ...item, children })
    }
    return emptyBox()
  }

  return (
    <div className={styles.index}>
      <DndContainer>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Module title="library">
              <Module>
                <Draggable onDrag={handleDrag} type="module" name="module1">
                  <Button type="primary">Module</Button>
                </Draggable>
              </Module>
              <Module>
                <Draggable onDrag={handleDrag} type="row" name="row1">
                  <Button type="primary">Row</Button>
                </Draggable>
              </Module>
            </Module>
          </Col>
          <Col span={12}>
            <Droppable onDrop={handleDrop} accept={['module', 'row']}>
              {box2.map((item) => {
                return renderDropContent(item)
              })}
            </Droppable>
          </Col>
          <Col span={6}>
            <Module title="setting"></Module>
          </Col>
        </Row>
      </DndContainer>
    </div>
  )
}
