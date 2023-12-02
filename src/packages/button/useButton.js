export default function useButton({ type = 'default', loading, icon, disabled, onClick, classNames, styles }) {
  return {
    props: {
      type,
      loading,
      icon,
      disabled,
      onClick,
      classNames,
      styles,
    },
  }
}
