import React from 'react';
import { useDrag } from 'react-dnd';

import styles from './Draggable.module.css';
function Draggable({children, style, id, type, onDragEnd, onDragStart, onDrag, onDrop, onDragEnter, onDragLeave, onDragOver, onDropAccepted, onDropRejected, onDropCapture, onDragEndCapture, onDragStartCapture, onDragCapture, onDragEnterCapture, onDragLeaveCapture, onDragOverCapture}){
    const [{ isDragging }, drag] = useDrag({
        item: { type, id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                onDragEnd(item, monitor)
            }
        },
        start(item, monitor) {
            onDragStart(item, monitor)
        },
        drag(item, monitor) {
            onDrag(item, monitor)
        },
        drop(item, monitor) {
            onDrop(item, monitor)
        },
        dragEnter(item, monitor) {
            onDragEnter(item, monitor)
        },
        dragLeave(item, monitor) {
            onDragLeave(item, monitor)
        },
        dragOver(item, monitor) {
            onDragOver(item, monitor)
        },
        dropAccepted(item, monitor) {
            onDropAccepted(item, monitor)
        },
        dropRejected(item, monitor) {
            onDropRejected(item, monitor)
        },
        dropCapture(item, monitor) {
            onDropCapture(item, monitor)
        },
        dragEnd(item, monitor) {
            onDragEnd(item, monitor)
        },
        dragStart(item, monitor) {
            onDragStart(item, monitor)
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
    })
    return <div 
        ref={drag} 
        style={{ ...style, opacity: isDragging ? 0.5 : 1 }} 
        className={styles.draggable}>{ children }</div>

}
export default Draggable
