import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import styles from './Draggable.module.css'
function Draggable({ children, style, item, onDrag, canDrag, ...rest }) {
  const type = 'component'
  const [{ isDragging }, drag, preview] = useDrag({
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
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })
  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1 }} className={styles.draggable} {...rest}>
      {children}
    </div>
  )
}

Draggable.defaultProps = {
  canDrag: () => true,
  onDrag: () => {},
}

export default Draggable
