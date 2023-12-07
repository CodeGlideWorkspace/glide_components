import { useImperativeHandle, useRef } from 'react'
import { isBoolean, isObject } from 'remote:glide_components/utils'

function getAutoSize(rowSize) {
  if (isBoolean(rowSize)) {
    return rowSize
  }

  if (isObject(rowSize)) {
    return { minRows: rowSize.min, maxRows: rowSize.max }
  }
}

export default function useInput(
  {
    value,
    type,
    placeholder,
    defaultValue,
    prefix,
    suffix,
    clearable,
    disabled,
    bordered,
    maxLength,
    showCount,
    rowSize,
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

  function handleChange({ target: { value } }) {
    onChange(value)
  }

  function handleEnter({ target: { value } }) {
    onEnter(value)
  }

  const textareaProps = {}
  if (type === 'textarea') {
    textareaProps.autoSize = getAutoSize(rowSize)
  }

  return {
    props: {
      placeholder,
      value,
      defaultValue,
      prefix,
      suffix,
      bordered,
      disabled,
      allowClear: clearable,
      maxLength,
      showCount,
      ...textareaProps,
      onChange: handleChange,
      onPressEnter: handleEnter,
    },
    ref: inputRef,
  }
}
