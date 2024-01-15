import { useState } from 'react'
import { isUndefined } from 'remote:glide_components/utils'

function useSider({
  style,
  className,
  collapsible,
  collapsedWidth,
  collapsed,
  defaultCollapsed,
  width,
  direction,
  onCollapse,
}) {
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed)

  const currCollapsed = isUndefined(collapsed) ? localCollapsed : collapsed
  // 计算箭头的方向
  let triggerDirection = currCollapsed ? 'right' : 'left'
  if (direction === 'right') {
    triggerDirection = currCollapsed ? 'left' : 'right'
  }

  function handleCollapse() {
    // 未传递collapsed属性时，走非受控模式
    if (isUndefined(collapsed)) {
      const nextCollapsed = !currCollapsed
      setLocalCollapsed(nextCollapsed)
      onCollapse(nextCollapsed)
      return
    }

    onCollapse(!currCollapsed)
  }

  return {
    collapsed: currCollapsed,
    direction,
    props: {
      style,
      className,
      theme: 'light',
      trigger: null,
      collapsible,
      collapsedWidth,
      collapsed: currCollapsed,
      width,
    },
    triggerProps: { direction: triggerDirection, onClick: handleCollapse },
  }
}

export default useSider
