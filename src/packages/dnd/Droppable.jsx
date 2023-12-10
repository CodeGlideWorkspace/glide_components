import React from 'react'
import { useDrop } from 'react-dnd'

import styles from './Droppable.module.css'

// 枚举 drop 在容器的位置 外部的 左右上下

function calcPosition(monitor, dropRef, depth) {
  const clientOffset = monitor.getClientOffset()
  const containerRect = dropRef.current.getBoundingClientRect()

  // 计算相对于容器的位置
  const x = clientOffset.x - containerRect.left
  const y = clientOffset.y - containerRect.top

  // 定义插槽的高度和宽度
  const slotWidth = containerRect.width / 3
  const slotHeight = containerRect.height / 3
  let position = ''
  // 判断放置的位置
  if (y < slotHeight) {
    // 放置在上方插槽
    console.log(`outer-top-${depth}`)
    position = 'top'
  } else if (y > 2 * slotHeight) {
    // 放置在下方插槽
    console.log(`outer-bottom-${depth}`)
    position = 'bottom'
  } else if (x < slotWidth) {
    // 放置在左侧插槽
    console.log(`outer-left-${depth}`)
    position = 'left'
  } else if (x > 2 * slotWidth) {
    // 放置在右侧插槽
    console.log(`outer-right-${depth}`)
    position = 'right'
  } else {
    // 放置在中间插槽
    console.log(`outer-center-${depth}`)
    position = 'center'
  }
  return position
}

function Droppable({ children, onDrop, state = {}, depth, style, accept }) {
  const [{ isOver, canDrop, dropPosition }, drop] = useDrop({
    accept,
    drop(item, monitor) {
      state.position = calcPosition(monitor, dropRef, depth)
      onDrop(item, monitor, state)
    },
    // accept(item, monitor) {
    //     onDropAccepted(item, monitor)
    // },
    // canDrop(item, monitor) {
    //     onDropRejected(item, monitor)
    // },
    // dropCapture(item, monitor) {
    //     onDropCapture(item, monitor)
    // },
    // dragEndCapture(item, monitor) {
    //     onDragEndCapture(item, monitor)
    // },
    // dragStartCapture(item, monitor) {
    //     onDragStartCapture(item, monitor)
    // },
    // dragCapture(item, monitor) {
    //     onDragCapture(item, monitor)
    // },
    // dragEnterCapture(item, monitor) {
    //     onDragEnterCapture(item, monitor)
    // },
    // dragLeaveCapture(item, monitor) {
    //     onDragLeaveCapture(item, monitor)
    // },
    // dragOverCapture(item, monitor) {
    //     onDragOverCapture(item, monitor)
    // },
    collect: (monitor) => {
      const isOver = monitor.isOver()
      const dropPosition = () => {
        if (!isOver) {
          return ''
        }
        const position = calcPosition(monitor, dropRef, depth)
        return `插入位置：${position}`
      }
      return { isOver, canDrop: monitor.canDrop(), dropPosition: dropPosition() }
    },
  })
  const isActive = isOver && canDrop
  let backgroundColor = 'rgba(0,0,0,0.3)'
  if (isActive) {
    backgroundColor = 'rgba(0,0,0,0.6)'
  } else if (canDrop) {
    backgroundColor = 'rgba(0,0,0,0.4)'
  }
  const dropRef = React.useRef(null)
  drop(dropRef)

  return (
    <>
      <span ref={dropRef} style={{ ...style, backgroundColor }} className={styles.droppable}>
        {dropPosition}
      </span>
      {children}
    </>
  )
}
export default Droppable
