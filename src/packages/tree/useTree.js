import { useState, useRef } from 'react'
import { isArray, filterTrees } from 'remote:glide_components/utils'

function useTree({
  style,
  allowDrop,
  block,
  autoExpand,
  strict,
  defaultExpandAll,
  defaultExpandParent,
  expandedKeys,
  defaultExpandedKeys,
  value,
  defaultValue,
  disabled,
  draggable,
  selectable,
  filter,
  height,
  icon,
  leafIcon,
  multiple,
  showLine,
  nodeRender,
  data,
  virtual,
  onChange,
  onClick,
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDragEnter,
  onDrop,
  onExpand,
  onContextMenu,
}) {
  const [searchText, setSearchText] = useState()

  const treeRef = useRef(null)
  const selectValue = multiple ? (isArray(value) ? value : []) : isArray(value) ? value[0] : value
  const defaultSelectValue = multiple
    ? isArray(defaultValue)
      ? defaultValue
      : []
    : isArray(defaultValue)
    ? defaultValue[0]
    : defaultValue

  const isShowIcon = !!icon
  const isShowLeafIcon = !!leafIcon

  function handleSearch(text) {
    setSearchText(text)
  }

  function handleSelect(selectedKeys, { selected, selectedNodes, node }) {
    onClick(node)

    if (!selectable) {
      return
    }

    if (multiple) {
      return
    }

    onChange(selectedKeys, { node, selected, selectedNodes })
  }

  function handleCheck(checkedKeys, { checked, checkedNodes, node }) {
    if (!selectable) {
      return
    }

    if (!multiple) {
      return
    }

    onChange(checkedKeys, { node, selected: checked, selectedNodes: checkedNodes })
  }

  return {
    props: {
      rootStyle: style,
      allowDrop,
      autoExpandParent: autoExpand,
      blockNode: block,
      checkable: multiple,
      ...(multiple && selectValue ? { checkedKeys: selectValue } : {}),
      defaultCheckedKeys: multiple ? defaultSelectValue : undefined,
      checkStrictly: strict,
      ...(!multiple && selectValue ? { selectedKeys: selectValue } : {}),
      defaultSelectedKeys: multiple ? undefined : defaultSelectValue,
      defaultExpandAll,
      ...(expandedKeys ? { expandedKeys } : {}),
      defaultExpandedKeys,
      defaultExpandParent,
      selectable: true,
      disabled,
      draggable,
      height,
      fieldNames: { title: 'label', key: 'value', children: 'children' },
      icon,
      showIcon: isShowIcon,
      showLine: showLine && isShowLeafIcon ? { showLeafIcon: leafIcon } : showLine,
      treeData: searchText
        ? filterTrees(data, (node) => {
            return filter(node, searchText)
          })
        : data,
      virtual,
      titleRender: nodeRender,
      onDragEnd,
      onDragLeave,
      onDragOver,
      onDragStart,
      onDragEnter,
      onDrop,
      onExpand,
      onRightClick: onContextMenu,
      onCheck: handleCheck,
      onSelect: handleSelect,
    },
    searchProps: {
      placeholder: '搜索节点',
      onSearch: handleSearch,
    },
    ref: treeRef,
  }
}

export default useTree
