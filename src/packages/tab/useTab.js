import { Children } from 'react'

export default function useTab({
  value,
  defaultValue,
  className,
  centered,
  action,
  destroyInactivePanel,
  onChange,
  children,
}) {
  const items = []
  Children.forEach(children, (child) => {
    if (child?.type?.displayName !== 'TabPanel') {
      return
    }

    items.push({
      key: child.props.name,
      label: child.props.title,
      disabled: child.props.disabled,
      children: child,
    })
  })

  return {
    props: {
      activeKey: value,
      defaultActiveKey: defaultValue,
      className,
      centered,
      tabBarExtraContent: action,
      destroyInactiveTabPane: destroyInactivePanel,
      items,
      onChange,
    },
  }
}
