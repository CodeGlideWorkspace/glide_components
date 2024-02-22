import React from 'react'
import propTypes from 'prop-types'
import { Tree as ATree, Input as AInput } from 'antd'
import { classNames } from 'remote:glide_components/utils'

import useTree from './useTree'

import styles from './Tree.module.less'

function Tree(props) {
  const { props: aProps, ref: aRef, searchProps } = useTree(props)

  return (
    <div className={classNames(styles.tree, { [props.className]: props.className })}>
      {props.searchable && <AInput.Search className={styles.search} {...searchProps} />}
      <ATree ref={aRef} {...aProps} />
    </div>
  )
}

Tree.defaultProps = {
  multiple: false,
  selectable: true,
  filter: (node, searchText) => {
    const label = (node.label || '').toLocaleLowerCase()
    const text = searchText.toLocaleLowerCase()

    return label.includes(text)
  },
  onClick: () => {},
  onChange: () => {},
}

Tree.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 是否允许拖动放置
   *
   * ({ dropNode, dropPosition }) => boolean
   */
  allowDrop: propTypes.func,

  /**
   * 是否自动展开
   */
  autoExpand: propTypes.bool,

  /**
   * 节点选择严格模式（父子节点选中状态互不关联）
   */
  strict: propTypes.bool,

  /**
   * 是否占据一整行
   */
  block: propTypes.bool,

  /**
   * 默认展开全部
   */
  defaultExpandAll: propTypes.bool,

  /**
   * 默认展开父节点
   */
  defaultExpandParent: propTypes.bool,

  /**
   * 展开的节点
   */
  expandedKeys: propTypes.arrayOf(propTypes.string),

  /**
   * 默认展开的节点
   */
  defaultExpandedKeys: propTypes.arrayOf(propTypes.string),

  /**
   * 选择的值
   */
  value: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),

  /**
   * 默认选择的值
   */
  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),

  /**
   * 禁用树
   */
  disabled: propTypes.bool,

  /**
   * 开启拖拽功能
   *
   * boolean | (node) => boolean
   */
  draggable: propTypes.oneOfType([propTypes.bool, propTypes.func]),

  /**
   * 是否可选
   */
  selectable: propTypes.bool,

  /**
   * 开启过滤功能
   */
  filterable: propTypes.bool,

  /**
   * 过滤节点
   *
   * (node) => boolean
   */
  filter: propTypes.func,

  /**
   * 设置树形节点的图标
   *
   * ReactNode | (props) => ReactNode
   */
  icon: propTypes.oneOfType([propTypes.element, propTypes.func]),
  leafIcon: propTypes.oneOfType([propTypes.element, propTypes.func]),

  /**
   * 树形高度，开启虚拟滚动时需要设置
   *
   */
  height: propTypes.number,

  /**
   * 是否支持多选
   */
  multiple: propTypes.bool,

  /**
   * 是否显示连接线
   */
  showLine: propTypes.bool,

  /**
   * 自定义节点渲染
   *
   * (node) => ReactNode
   */
  nodeRender: propTypes.func,

  /**
   * 树形节点数据
   */
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      disabled: propTypes.bool,
      selectable: propTypes.bool,
      isLeaf: propTypes.bool,
      children: propTypes.array,
    }),
  ),

  /**
   * 开启虚拟滚动
   */
  virtual: propTypes.bool,

  /**
   * 选中状态变更函数
   *
   * (value, option) => void
   */
  onChange: propTypes.func,

  /**
   * 节点点击事件
   *
   * (node) => void
   */
  onClick: propTypes.func,

  /**
   * 拖拽相关函数
   *
   * ({ event, node }) => void
   */
  onDragEnd: propTypes.func,
  onDragLeave: propTypes.func,
  onDragOver: propTypes.func,
  onDragStart: propTypes.func,

  /**
   * 拖拽相关函数
   *
   * ({ event, node, expandedKeys }) => void
   */
  onDragEnter: propTypes.func,

  /**
   * 拖拽相关函数
   *
   * ({ event, node, dragNode, dragNodesKeys }) => void
   */
  onDrop: propTypes.func,

  /**
   * 展开/收起节点时触发
   *
   * (expandedKeys, { expanded: boolean, node }) => void
   */
  onExpand: propTypes.func,

  /**
   * 右键菜单响应事件
   *
   * ({event, node}) => void
   */
  onContextMenu: propTypes.func,
}

export default Tree
