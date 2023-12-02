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
  const handleDrop = (item, monitor, state) => {
    console.log(item, monitor, state)
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return [...box2, item]
    })
  }
  const handleDropInner = (item, monitor, state) => {
    console.log(item, monitor, state)
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return box2.map((box) => {
        if (box.id === state.id) {
          // 根据 position 插入
          // 当插入为 left 或者 right 时，需要将当前的col 要span 为 仅一个时为24 两个时为12 三个时为8
          if (state.position === 'left') {
            const len = box.slots?.length || 1
            box.slots = [item, ...(box.slots || [])].map((slot) => {
              return {
                ...slot,
                span: 24 / (len + 1),
              }
            })
          } else if (state.position === 'right') {
            const len = box.slots?.length || 1
            box.slots = [...(box.slots || []), item].map((slot) => {
              return {
                ...slot,
                span: 24 / (len + 1),
              }
            })
          } else if (state.position === 'top') {
            box.slots = [item, ...(box.slots || [])]
          } else if (state.position === 'bottom') {
            box.slots = [...(box.slots || []), item]
          } else {
            // 默认下
            box.slots = [...(box.slots || []), item]
          }
        }
        return box
      })
    })
  }
  const addMore = () => {
    return <div style={{ minHeight: '50px', borderWidth: '1px', borderStyle: 'dashed' }}>请拖入组件</div>
  }

  const emptyBox = () => {
    return <div style={{ minHeight: '100px' }}>请拖入[module]组件</div>
  }
  const rowBox = ({ children, type, id }) => {
    const hasChildren = children && children.length > 0
    return (
      <Row key={id}>
        <Col span={24}>
          <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
            {!hasChildren ? emptyBox() : children}
          </Droppable>
        </Col>
      </Row>
    )
  }
  const moduleBox = ({ name, id, children }) => {
    return (
      <Module title={name} key={id}>
        {id}
        {children}
      </Module>
    )
  }
  const column3Box = ({ children, type, id }) => {
    const hasChildren = children && children.length > 0
    return (
      <Row key={id}>
        <Col span={8}>
          <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
            {!hasChildren ? emptyBox() : children[0]}
          </Droppable>
        </Col>
        <Col span={8}>
          <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
            {!hasChildren || !children[1] ? emptyBox() : children[1]}
          </Droppable>
        </Col>
        <Col span={8}>
          <Droppable onDrop={handleDropInner} state={{ type, id }} depth={2} accept={['module']}>
            {!hasChildren || !children[2] ? emptyBox() : children[2]}
          </Droppable>
        </Col>
      </Row>
    )
  }

  const renderDropContent = (item) => {
    const { type, slots } = item
    let children = []
    if (slots && slots.length > 0) {
      children = slots.map((child) => renderDropContent(child))
    }
    console.log(children)
    if (type === 'module') {
      return moduleBox({ ...item, children })
    }
    if (type === 'row') {
      return rowBox({ ...item, children })
    }
    if (type === 'column3') {
      return column3Box({ ...item, children })
    }
    return emptyBox()
  }
  console.log('box2', box2)
  return (
    <div className={styles.index}>
      <DndContainer>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Module title="library">
              <Module>
                <Draggable onDrag={handleDrag} type="row" name="row1">
                  <Button type="primary">Row</Button>
                </Draggable>
              </Module>
              <Module>
                <Draggable onDrag={handleDrag} type="module" name="module1">
                  <Button type="primary">Module</Button>
                </Draggable>
              </Module>
              <Module>
                <Draggable onDrag={handleDrag} type="column3" name="column3">
                  <Button type="primary">colum3</Button>
                </Draggable>
              </Module>
            </Module>
          </Col>
          <Col span={12}>
            <Droppable onDrop={handleDrop} depth={1} accept={['row', 'column3']}>
              {box2.map((item) => {
                return renderDropContent(item)
              })}
              {addMore()}
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
