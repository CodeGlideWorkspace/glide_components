export default function useSwitch({ autoFocus, value, defaultValue, disabled, onChange }) {
  return { props: { autoFocus, checked: value, defaultChecked: defaultValue, disabled, onChange } }
}
