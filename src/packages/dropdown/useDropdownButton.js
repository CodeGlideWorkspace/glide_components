import useDropdown from './useDropdown'
export default function usePopover({
  loading = false,
  danger,
  type = 'default',
  size = 'middle',
  icon,
  onClick,
  ...props
}) {
  const { props: aProps } = useDropdown(props)
  return {
    props: {
      ...aProps,
      loading,
      danger,
      type,
      size,
      icon,
      onClick,
    },
  }
}
