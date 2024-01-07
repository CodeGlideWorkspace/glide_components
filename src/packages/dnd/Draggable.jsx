import React from 'react'
import { useDrag } from 'react-dnd'

import styles from './Draggable.module.css'
function Draggable({ children, style, item, onDrag, canDrag }) {
  const type = 'component'
  const [{ isDragging }, drag] = useDrag({
    type,
    item,
    canDrag(source) {
      const result = canDrag(source, item)
      return result
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    drag(source, monitor) {
      onDrag(source, item, monitor)
    },
  })
  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1 }} className={styles.draggable}>
      {children}
    </div>
  )
}
export default Draggable
