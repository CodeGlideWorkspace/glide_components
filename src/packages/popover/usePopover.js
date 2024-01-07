export default function usePopover({
  arrow,
  background,
  destroyInactive,
  mouseEnterDelay,
  mouseLeaveDelay,
  placement,
  trigger,
  visible,
  zIndex,
  title,
  content,
  onChange,
}) {
  return {
    props: {
      arrow,
      color: background,
      destroyTooltipOnHide: destroyInactive,
      mouseEnterDelay,
      mouseLeaveDelay,
      placement,
      trigger,
      open: visible,
      zIndex,
      title,
      content,
      onOpenChange: onChange,
    },
  }
}
