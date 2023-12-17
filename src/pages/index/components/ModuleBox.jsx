import React from 'react'
import { Module } from '@/packages/module'
import { Draggable } from '@/packages/dnd'
function ModuleBox({ id, name, children }) {
  return (
    <Draggable type="module" id={id} name={name}>
      <Module title={name} key={id}>
        {id}
        {children}
      </Module>
    </Draggable>
  )
}

export default ModuleBox
