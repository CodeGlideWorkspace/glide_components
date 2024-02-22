import React from 'react'
import { useDragLayer } from 'react-dnd'

function CustomDragLayer() {
  const { isDragging, item, clientOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    differenceFormInitialOffset: monitor.getDifferenceFromInitialOffset(),
  }))

  if (!isDragging) {
    return null
  }
  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1000,
        left: (clientOffset?.x || 0) - 10,
        top: (clientOffset?.y || 0) - 10,
        width: '100px',
        height: '20px',
        fontSize: '12px',
        lineHeight: '20px',
        paddingLeft: '20px',
        backgroundColor: 'gray',
      }}
    >
      {/* Your custom drag layer content */}
      {item.data?.name}
    </div>
  )
}

export default CustomDragLayer
