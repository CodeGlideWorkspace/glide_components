import React from 'react'
import { Draggable } from '@/packages/dnd'

import styles from './LibraryItem.module.css'
const LibraryItem = ({ title, component, url }) => {
  const handleDrag = (item, monitor) => {
    console.log(item, monitor)
  }
  const style = {
    display: 'inline-block',
  }
  return (
    <div className={styles.container}>
      <Draggable onDrag={handleDrag} style={style} type={component} name={title}>
        <img alt="图片" src={url} className={styles.img} />
        <div className={styles.title}>{title}</div>
      </Draggable>
    </div>
  )
}

export default LibraryItem
