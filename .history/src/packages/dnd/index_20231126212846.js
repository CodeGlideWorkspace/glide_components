import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";




export default function dndProvider(params) {
    return (
        <DndProvider backend={HTML5Backend}>
            {params.children}
        </DndProvider>
    )
}