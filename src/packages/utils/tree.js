import { isArray, isUndefined, isObject } from './is'

/**
 * 树形结构遍历方法
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} each 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 *
 * @returns {Void}
 *
 * example:
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * eachTree(tree, (node) => console.log(node.id))
 */
export function eachTree(tree, each, option = {}) {
  const { childrenKey = 'children', slotKey = 'slots' } = option

  each(tree)

  // 遍历多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      const slots = tree[slotKey]
      const slotChildren = isArray(slots[slotName]) ? slots[slotName] : []
      slotChildren.forEach((child) => eachTree(child, each, option))
    })
  }

  // 遍历单个插槽节点
  if (isArray(tree[slotKey])) {
    tree[slotKey].forEach((child) => eachTree(child, each, option))
  }

  // 遍历子节点
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
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
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
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
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

  const { childrenKey = 'children', slotKey = 'slots' } = option

  let item
  // 查找多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      const slots = tree[slotKey]
      const slotChildren = isArray(slots[slotName]) ? slots[slotName] : []
      slotChildren.some((child) => {
        item = findTree(child, find, option)
        return isUndefined(item)
      })
    })
  }
  if (item) {
    return item
  }

  // 查找单个插槽节点
  if (isArray(tree[slotKey])) {
    tree[slotKey].some((child) => {
      item = findTree(child, find, option)
      return isUndefined(item)
    })
  }
  if (item) {
    return item
  }

  const children = isArray(tree[childrenKey]) ? tree[childrenKey] : []
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
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
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

/**
 * 树形结构组装方法
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} reduce 组装回调函数
 * @param {Any} initialValue 初始化值
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 *
 * @returns {Any} 组装完成的结果
 *
 * example:
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const value = reduceTree(tree, (result, child) => {
 *  result[child.id] = true
 *  return result
 * }, {})
 */
export function reduceTree(tree, reduce, initialValue, option = {}) {
  let nextValue = reduce(initialValue, tree)

  const { childrenKey = 'children', slotKey = 'slots' } = option

  // 组装多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      const slots = tree[slotKey]
      const slotChildren = isArray(slots[slotName]) ? slots[slotName] : []
      nextValue = slotChildren.reduce((result, child) => {
        return reduceTree(child, reduce, result, option)
      }, nextValue)
    })
  }

  // 组装单个插槽节点
  if (isArray(tree[slotKey])) {
    nextValue = tree[slotKey].reduce((result, child) => {
      return reduceTree(child, reduce, result, option)
    }, nextValue)
  }

  const children = isArray(tree[childrenKey]) ? tree[childrenKey] : []
  return children.reduce((result, child) => {
    return reduceTree(child, reduce, result, option)
  }, nextValue)
}

/**
 * 树形批量组装方法
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} reduce 组装回调函数
 * @param {Any} initialValue 初始化值
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 *
 * @returns {Any} 组装完成的结果
 *
 * example:
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * const value = reduceTrees(trees, (result, child) => {
 *  result[child.id] = true
 *  return result
 * }, {})
 */
export function reduceTrees(trees, reduce, initialValue, option) {
  if (!isArray(trees)) {
    return initialValue
  }

  return trees.reduce((result, tree) => {
    return reduceTree(tree, reduce, result, option)
  }, initialValue)
}
