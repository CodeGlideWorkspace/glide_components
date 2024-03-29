import React from 'react'
import { useDrop } from 'react-dnd'

import styles from './Droppable.module.css'

// 枚举 drop 在容器的位置 外部的 左右上下

function calcPosition(monitor, dropRef, depth) {
  let position = 'top'
  const clientOffset = monitor.getClientOffset()
  const containerRect = dropRef.current.getBoundingClientRect()
  if (!clientOffset) {
    return position
  }
  // 计算相对于容器的位置
  const x = clientOffset.x - containerRect.left
  const y = clientOffset.y - containerRect.top

  // 定义插槽的高度和宽度
  const slotWidth = containerRect.width / 3
  const slotHeight = containerRect.height / 3
  // 判断放置的位置
  if (y < slotHeight) {
    // 放置在上方插槽
    position = 'top'
  } else if (y > 2 * slotHeight) {
    // 放置在下方插槽
    position = 'bottom'
  } else if (x < slotWidth) {
    // 放置在左侧插槽
    position = 'left'
  } else if (x > 2 * slotWidth) {
    // 放置在右侧插槽
    position = 'right'
  } else {
    // 放置在中间插槽
    position = 'center'
  }
  return position
}

function Droppable({ children, onDrop, state = {}, item, depth, style, canDrop, onClick, ...rest }) {
  const [{ isOver, canDroppable }, drop] = useDrop({
    accept: 'component',
    canDrop(source) {
      const target = item
      const result = canDrop(source, target)
      return result
    },
    drop(source, monitor) {
      if (monitor.didDrop()) {
        return
      }
      state.position = calcPosition(monitor, dropRef, depth)
      const target = item
      onDrop(source, target, state, monitor)
    },
    collect: (monitor) => {
      const isOver = monitor.isOver({
        shallow: true,
      })
      const dropPosition = () => {
        if (!isOver) {
          return ''
        }
        const position = calcPosition(monitor, dropRef, depth)
        return `插入位置：${position}`
      }
      return { isOver, canDroppable: monitor.canDrop(), dropPosition: dropPosition() }
    },
  })

  const isActive = isOver && canDrop
  let backgroundColor = 'transparent'
  if (isActive) {
    backgroundColor = 'rgba(0,0,0,0.3)'
  } else if (canDroppable) {
    backgroundColor = 'rgba(0,0,0,0.1)'
  }
  const dropRef = React.useRef(null)
  drop(dropRef)

  return (
    <div ref={dropRef} style={{ ...style, backgroundColor }} className={styles.droppable} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}

Droppable.defaultProps = {
  onDrop: () => {},
  canDrop: () => true,
}

export default Droppable
