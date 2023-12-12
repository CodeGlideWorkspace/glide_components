import React from 'react'
import { useDrag } from 'react-dnd'

import styles from './Draggable.module.css'
function Draggable({ children, style, name, onDrag, type }) {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    drag(item, monitor) {
      onDrag(item, monitor)
    },
  })
  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1 }} className={styles.draggable}>
      {children}
    </div>
  )
}
export default Draggable
