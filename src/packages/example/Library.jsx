import React from 'react'

import { Button } from 'antd'
import Draggable from './Draggable.js'
function Library() {
  return (
    <div>
      <Draggable name="button1">
        <Button type="primary">Button1</Button>
      </Draggable>
      <Draggable name="button2">
        <Button type="primary">Button2</Button>
      </Draggable>
      <Draggable name="button3">
        <Button type="primary">Button3</Button>
      </Draggable>
    </div>
  )
}
export default Library
