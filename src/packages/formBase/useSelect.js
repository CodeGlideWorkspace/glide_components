import React, { useImperativeHandle, useRef } from 'react'
import { isFunction } from 'remote:glide_components/utils'

export default function useSelect(
  {
    style,
    className,
    value,
    defaultValue,
    clearable,
    autoClearSearchValue,
    autoFocus,
    bordered,
    disabled,
    multiple,
    creatable,
    virtual,
    prefix,
    suffix,
    filter,
    maxTagCount,
    maxTagPlaceholder,
    maxTagTextLength,
    data,
    optionRender,
    loading,
    labelInValue,
    placeholder,
    searchable,
    separators,
    onChange,
    onSearch,
  },
  ref,
) {
  const selectRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        selectRef.current?.focus()
      },
      blur: () => {
        selectRef.current?.blur()
      },
    }
  })

  let mode
  if (separators || creatable) {
    mode = 'tags'
  } else if (multiple) {
    mode = 'multiple'
  }

  function dropdownRender(menu) {
    return (
      <>
        {prefix}
        {menu}
        {suffix}
      </>
    )
  }

  /**
   * 默认按值的精确匹配以及文案的模糊匹配规则
   */
  function filterOption(text, option) {
    if (isFunction(filter)) {
      return filter(text, option)
    }

    const lowerText = text?.toLowerCase()
    const lowerLabel = option.label?.toLowerCase()
    const lowerValue = String(option.value)?.toLowerCase()

    return lowerLabel?.includes(lowerText) || lowerValue === lowerText
  }

  return {
    props: {
      style,
      className,
      value,
      defaultValue,
      allowClear: clearable,
      autoClearSearchValue,
      autoFocus,
      bordered,
      disabled,
      virtual,
      mode,
      dropdownRender,
      filterOption,
      maxTagCount,
      labelInValue,
      maxTagPlaceholder,
      maxTagTextLength,
      options: data,
      optionRender,
      loading,
      placeholder,
      showSearch: searchable,
      tokenSeparators: separators,
      fieldNames: { label: 'label', value: 'value', groupLabel: 'title', options: 'children' },
      onChange,
      onSearch,
    },
    ref: selectRef,
  }
}
