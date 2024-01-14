export default function useTooltip({
  arrow,
  background,
  destroyInactive,
  mouseEnterDelay,
  mouseLeaveDelay,
  placement,
  trigger,
  visible,
  zIndex,
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
      onOpenChange: onChange,
    },
  }
}
