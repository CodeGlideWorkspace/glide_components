import React from 'react'

import { Droppable } from '@/packages/dnd'

import EmptyBox from './components/EmptyBox'
import RowBox from './components/RowBox'
import ModuleBox from './components/ModuleBox'
import Column3 from './components/Column3'
import EditorCol from './components/EditorCol'

const genUUID = () => {
  return Math.random().toString(36).substr(2)
}

const updateBox = ({ box, state, item }) => {
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
}

function Editor({ data = [] }) {
  const [box2, setBox2] = React.useState(data)
  const handleDrop = (item, monitor, state) => {
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return [...box2, item]
    })
  }
  const handleDrop2 = (item, monitor, state) => {
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return box2.map((box) => {
        return updateBox({ box, state, item })
      })
    })
  }
  const handleDrop3 = (item, monitor, state) => {
    console.log('handleDrop3', item, monitor, state)
    if (!item.id) {
      item.id = genUUID()
    }

    setBox2((box2) => {
      return box2.map((box) => {
        if (box?.slots) {
          box.slots = box.slots.map((slot) => {
            return updateBox({ box: slot, state, item })
          })
        }
        return box
      })
    })
  }
  const addMore = () => {
    return <div style={{ minHeight: '50px', borderWidth: '1px', borderStyle: 'dashed' }}>请拖入组件</div>
  }

  const renderDropContent = (item) => {
    const { type, slots } = item
    let children = []
    if (slots && slots.length > 0) {
      children = slots.map((child) => renderDropContent(child))
    }
    if (type === 'module') {
      return (
        <ModuleBox key={item.id} {...item}>
          {children}
        </ModuleBox>
      )
    }
    if (type === 'row') {
      return (
        <RowBox key={item.id} {...item} handleDropInner={handleDrop2}>
          {children}
        </RowBox>
      )
    }
    if (type === 'column3') {
      return (
        <Column3 key={item.id} {...item} handleDropInner={handleDrop2}>
          {children}
        </Column3>
      )
    }
    if (type === 'col') {
      return (
        <EditorCol key={item.id} {...item} handleDropInner={handleDrop3}>
          {children}
        </EditorCol>
      )
    }
    return <EmptyBox />
  }
  console.log('render:box2', box2)
  return (
    <Droppable onDrop={handleDrop} depth={1} accept={['row', 'column3']}>
      {box2.map((item) => renderDropContent(item))}
      {addMore()}
    </Droppable>
  )
}
export default Editor
