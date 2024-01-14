export default function useButton({ type, loading, icon, disabled, onClick, className, style }) {
  return {
    props: {
      type,
      loading,
      icon,
      disabled,
      classNames: className,
      styles: style,
      onClick,
    },
  }
}
