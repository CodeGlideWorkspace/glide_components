import React from 'react'

import { Module } from '@/packages/module'
import { Button } from '@/packages/button'
import { Draggable } from '@/packages/dnd'

function Library() {
  const handleDrag = (item, monitor) => {
    console.log(item, monitor)
  }
  const style = {
    display: 'inline-block',
  }
  return (
    <Module title="library">
      <Module>
        <Draggable onDrag={handleDrag} style={style} type="row" name="row1">
          <Button type="primary">Row</Button>
        </Draggable>
      </Module>
      <Module>
        <Draggable onDrag={handleDrag} style={style} type="module" name="module1">
          <Button type="primary">Module</Button>
        </Draggable>
      </Module>
      <Module>
        <Draggable onDrag={handleDrag} style={style} type="column3" name="column3">
          <Button type="primary">colum3</Button>
        </Draggable>
      </Module>
      <Module>
        <Draggable onDrag={handleDrag} style={style} type="col" name="col">
          <Button type="primary">col</Button>
        </Draggable>
      </Module>
    </Module>
  )
}
export default Library
