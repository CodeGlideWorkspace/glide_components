import React from 'react'
import { useDrop } from 'react-dnd'

import styles from './Droppable.module.css'
function Droppable({children, style, id, type, onDrop, onDropAccepted, onDropRejected, onDropCapture, onDragEndCapture, onDragStartCapture, onDragCapture, onDragEnterCapture, onDragLeaveCapture, onDragOverCapture}){
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: type,
        drop(item, monitor) {
            onDrop(item, monitor)
        },
        accept(item, monitor) {
            onDropAccepted(item, monitor)
        },
        canDrop(item, monitor) {
            onDropRejected(item, monitor)
        },
        dropCapture(item, monitor) {
            onDropCapture(item, monitor)
        },
        dragEndCapture(item, monitor) {
            onDragEndCapture(item, monitor)
        },
        dragStartCapture(item, monitor) {
            onDragStartCapture(item, monitor)
        },
        dragCapture(item, monitor) {
            onDragCapture(item, monitor)
        },
        dragEnterCapture(item, monitor) {
            onDragEnterCapture(item, monitor)
        },
        dragLeaveCapture(item, monitor) {
            onDragLeaveCapture(item, monitor)
        },
        dragOverCapture(item, monitor) {
            onDragOverCapture(item, monitor)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    const isActive = isOver && canDrop
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = '#333'
    } else if (canDrop) {
        backgroundColor = '#444'
    }
    return (
        <div 
            ref={drop} 
            style={{ ...style, backgroundColor }} 
            className={styles.droppable}>{ children }</div>
    )
}
export default Droppable