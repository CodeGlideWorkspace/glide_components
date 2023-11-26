import React, { Children } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'

export default function useCollapse({ value, defaultValue, ghost, bordered = true, children, onChange }) {
  const items = []
  Children.forEach(children, (child) => {
    if (child?.type?.displayName !== 'CollapsePanel') {
      return
    }

    items.push({
      key: child.name,
      label: child.props.title,
      extra: child.props.action,
      style: child.props.style,
      children: child,
    })
  })

  function expandIcon({ isActive }) {
    return <CaretRightOutlined rotate={isActive ? 90 : 0} />
  }

  return { props: { activeKey: value, bordered, ghost, defaultActiveKey: defaultValue, onChange, expandIcon, items } }
}
