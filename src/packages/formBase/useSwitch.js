import { useRef, useImperativeHandle } from 'react'

export default function useSwitch({ autoFocus, value, defaultValue, disabled, onChange }, ref) {
  const switchRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        switchRef.current?.focus()
      },
      blur: () => {
        switchRef.current?.blur()
      },
    }
  })

  return { props: { autoFocus, checked: value, defaultChecked: defaultValue, disabled, onChange }, ref: switchRef }
}
