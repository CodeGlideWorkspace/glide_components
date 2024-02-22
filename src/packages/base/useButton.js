export default function useButton({ type, block, loading, icon, disabled, onClick, className, style }) {
  return {
    props: {
      type,
      block,
      loading,
      icon,
      disabled,
      classNames: className,
      styles: style,
      onClick,
    },
  }
}
