import { useImperativeHandle, useRef } from 'react'

export default function useRadio({ style, className, disabled, value, defaultValue, data, type, onChange }, ref) {
  const radioRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        radioRef.current?.focus()
      },
      blur: () => {
        radioRef.current?.blur()
      },
    }
  })

  function handleChange({ target: { value } }) {
    onChange(value)
  }

  return {
    props: {
      style,
      className,
      disabled,
      value,
      defaultValue,
      options: data,
      optionType: type,
      onChange: handleChange,
    },
    ref: radioRef,
  }
}
