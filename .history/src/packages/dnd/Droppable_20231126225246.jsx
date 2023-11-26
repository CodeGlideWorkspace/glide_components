import React from 'react'
import { useDrop } from 'react-dnd'

import styles from './Droppable.module.css'
function Droppable({children}){
    return <div>{ children }</div>
}
export default Droppable