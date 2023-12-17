import React from 'react'

import { Module } from '@/packages/module'
import { Collapse, CollapsePanel } from '@/packages/collapse'
import LibraryItem from './components/LibraryItem'
import { Col, Row } from '@/packages/grid'

import { libraryData } from './libraryData'
function Library() {
  const renderItems = ({ title, name, data }) => {
    const hasData = data.length > 0
    return (
      <CollapsePanel title={title} name={name} key={name}>
        <Row>
          {hasData
            ? data.map((item) => (
                <Col span={12} key={item.component}>
                  <LibraryItem {...item} />
                </Col>
              ))
            : '暂无数据'}
        </Row>
      </CollapsePanel>
    )
  }
  return (
    <Module title="library">
      <Collapse defaultValue={['base', 'layout', 'biz']}>{libraryData.map((item) => renderItems(item))}</Collapse>
    </Module>
  )
}
export default Library
