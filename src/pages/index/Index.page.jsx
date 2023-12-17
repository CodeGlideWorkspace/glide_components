/**
 * 页面加载流程说明
 * 1. 如果id存在，说明是编辑页面，需要请求接口获取数据
 * 2. 如果id不存在，说明是新建页面，需要使用默认数据
 *
 */
import React from 'react'

import styles from './Index.module.css'
import { Col } from '@/packages/col'
import { Row } from '@/packages/row'
import { Module } from '@/packages/module'
import { DndProvider } from '@/packages/dnd'

import Library from './Library'
import Editor from './Editor'

import { initData } from './initData'

export default function Index() {
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
