export default function usePopover({
  arrow = false,
  autoAdjustOverflow = true,
  disabled,
  menu,
  placement,
  trigger = ['hover'],
  onOpenChange,
}) {
  return {
    props: {
      arrow,
      autoAdjustOverflow,
      disabled,
      menu,
      placement,
      trigger,
      onOpenChange,
    },
  }
}
