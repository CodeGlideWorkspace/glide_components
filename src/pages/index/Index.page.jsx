import React from 'react'

import styles from './Index.module.css'
import { Col } from '@/packages/col'
import { Row } from '@/packages/row'
import { Module } from '@/packages/module'
import { DndProvider } from '@/packages/dnd'

import Library from './Library'
import Editor from './Editor'

export default function Index() {
  const initData = [
    {
      id: '1',
      type: 'row', // 'module' | 'row
      name: 'row1',
      slots: [
        {
          id: '2',
          type: 'col',
          name: 'col1',
          slots: [
            {
              id: '3',
              type: 'module',
              name: 'module1',
            },
          ],
        },
      ],
    },
  ]
  return (
    <div className={styles.index}>
      <DndProvider>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Library></Library>
          </Col>
          <Col span={12}>
            <Editor data={initData}></Editor>
          </Col>
          <Col span={6}>
            <Module title="setting"></Module>
          </Col>
        </Row>
      </DndProvider>
    </div>
  )
}
