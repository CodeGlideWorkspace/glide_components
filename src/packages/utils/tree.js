import { isArray, isUndefined } from './is'

/**
 * 树形结构遍历方法
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} each 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 *
 * @returns {Void}
 *
 * example:
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * eachTree(tree, (node) => console.log(node.id))
 */
export function eachTree(tree, each, option = {}) {
  const { childrenKey = 'children' } = option

  each(tree)
  const children = isArray(tree[childrenKey]) ? tree[childrenKey] : []
  children.forEach((child) => eachTree(child, each, option))
}

/**
 * 树形批量遍历方法
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} each 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 *
 * @returns {Void}
 *
 * example:
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * eachTrees(trees, (node) => console.log(node.id))
 */
export function eachTrees(trees, each, option) {
  if (!isArray(trees)) return trees
  return trees.forEach((tree) => eachTree(tree, each, option))
}

/**
 * 树形结构查找方法
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} find 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 *
 * @returns {TreeNode | Undefined}
 *
 * example:
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const findItem = findTree(tree, (node) => node.id === 3)
 */
export function findTree(tree, find, option = {}) {
  const isMatched = find(tree)
  if (isMatched) {
    return tree
  }

  const { childrenKey = 'children' } = option
  const children = isArray(tree[childrenKey]) ? tree[childrenKey] : []
  let item
  children.some((child) => {
    item = findTree(child, find, option)
    return isUndefined(item)
  })
  return item
}

/**
 * 树形批量查找方法
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} find 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 *
 * @returns {TreeNode}
 *
 * example:
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * const findItem = findTrees(trees, (node) => node.id === 2)
 */
export function findTrees(trees, find, option) {
  if (!isArray(trees)) {
    return
  }

  let item
  trees.some((tree) => {
    item = findTree(tree, find, option)
    return !!item
  })

  return item
}
