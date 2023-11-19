import React, { Children } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse as ACollapse } from 'antd'

function Collapse({ children, ...props }) {
  const items = []
  Children.forEach(children, (child) => {
    if (child?.type?.displayName !== 'CollapsePanel') {
      return
    }

    items.push({
      key: child.key,
      label: child.props.title,
      extra: child.props.action,
      style: child.props.style,
      children: child,
    })
  })

  return (
    <ACollapse
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      {...props}
      items={items}
    />
  )
}

Collapse.displayName = 'Collapse'

export default Collapse
