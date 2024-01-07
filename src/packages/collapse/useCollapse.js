import React, { Children } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'

export default function useCollapse({
  value,
  className,
  style,
  defaultValue,
  destroyInactive,
  ghost,
  collapsible,
  mode,
  bordered,
  children,
  onChange,
}) {
  const items = []
  Children.forEach(children, (child) => {
    if (child?.type?.displayName !== 'CollapsePanel') {
      return
    }

    items.push({
      key: child.props.name,
      label: child.props.title,
      extra: child.props.action,
      style: child.props.style,
      className: child.props.className,
      showArrow: collapsible,
      children: child,
    })
  })

  function expandIcon({ isActive }) {
    return <CaretRightOutlined rotate={isActive ? 90 : 0} />
  }

  return {
    props: {
      className,
      style,
      activeKey: value,
      bordered,
      ghost,
      defaultActiveKey: defaultValue,
      destroyInactivePanel: destroyInactive,
      onChange,
      expandIcon,
      collapsible: collapsible ? mode : 'icon',
      items,
    },
  }
}
