import { useImperativeHandle, useRef } from 'react'

export default function useNumber(
  {
    value,
    placeholder,
    defaultValue,
    prefix,
    control,
    min,
    max,
    className,
    style,
    precision,
    step,
    disabled,
    bordered,
    autoFocus,
    onBlur,
    onFocus,
    onStep,
    onChange,
    onEnter,
  },
  ref,
) {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus()
      },
      blur: () => {
        inputRef.current?.blur()
      },
    }
  })

  function handleChange(value) {
    onChange(value)
  }

  function handleEnter({ target: { value } }) {
    onEnter(value)
  }

  function handleStep(value) {
    onStep(value)
  }

  return {
    props: {
      placeholder,
      value,
      defaultValue,
      prefix,
      min,
      max,
      step,
      precision,
      controls: control,
      bordered,
      autoFocus,
      disabled,
      style,
      className,
      onBlur,
      onFocus,
      onChange: handleChange,
      onPressEnter: handleEnter,
      onStep: handleStep,
    },
    ref: inputRef,
  }
}
