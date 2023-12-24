import React, { Children } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'

export default function useCollapse({
  value,
  defaultValue,
  destroyInactivePanel,
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
      activeKey: value,
      bordered,
      ghost,
      defaultActiveKey: defaultValue,
      destroyInactivePanel,
      onChange,
      expandIcon,
      collapsible: collapsible ? mode : 'icon',
      items,
    },
  }
}
