import { isArray, isUndefined, isObject, isFunction } from './is'

function getChildren(tree, option = {}) {
  const { childrenKey = 'children', slotKey = 'slots' } = option

  let children = []
  // 遍历多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      const slots = tree[slotKey]
      const slotChildren = isArray(slots[slotName]) ? slots[slotName] : []
      children = children.concat(slotChildren)
    })
  }

  // 遍历单个插槽节点
  if (isArray(tree[slotKey])) {
    children = children.concat(tree[slotKey])
  }

  // 遍历子节点
  if (isArray(tree[childrenKey])) {
    children = children.concat(tree[childrenKey])
  }

  return children
}

/**
 * 树形结构遍历方法
 * eachTree
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} each 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Void}
 *
 * @example
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * eachTree(tree, (node) => console.log(node.id))
 */
export function eachTree(tree, each, option) {
  if (!tree) {
    return
  }

  if (isFunction(option?.before)) {
    option.before(tree)
  }

  each(tree)

  const children = getChildren(tree, option)
  eachTrees(children, each, option)

  if (isFunction(option?.after)) {
    option.after(tree)
  }
}

/**
 * 树形批量遍历方法
 * eachTrees
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} each 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Void}
 *
 * @example
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * eachTrees(trees, (node) => console.log(node.id))
 */
export function eachTrees(trees, each, option) {
  if (!isArray(trees)) return trees
  trees.forEach((tree) => eachTree(tree, each, option))
}

/**
 * 树形结构查找方法
 * findTree
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} find 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {TreeNode | Undefined}
 *
 * @example
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const findItem = findTree(tree, (node) => node.id === 3)
 */
export function findTree(tree, find, option) {
  if (!tree) {
    return
  }

  if (isFunction(option?.before)) {
    option.before(tree)
  }

  let isMatched = find(tree)

  if (isMatched) {
    if (isFunction(option?.after)) {
      option.after(tree)
    }

    return tree
  }

  const children = getChildren(tree, option)
  isMatched = findTrees(children, find, option)

  if (isFunction(option?.after)) {
    option.after(tree)
  }

  return isMatched
}

/**
 * 树形批量查找方法
 * findTrees
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} find 遍历回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {TreeNode}
 *
 * @example
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
    return !isUndefined(item)
  })

  return item
}

/**
 * 树形结构组装方法
 * reduceTree
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} reduce 组装回调函数
 * @param {Any} initialValue 初始化值
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 组装完成的结果
 *
 * @example
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const value = reduceTree(tree, (result, child) => {
 *  result[child.id] = true
 *  return result
 * }, {})
 */
export function reduceTree(tree, reduce, initialValue, option = {}) {
  if (!tree) {
    return initialValue
  }

  if (option?.before) {
    option.before(tree)
  }

  let nextValue = reduce(initialValue, tree)

  const children = getChildren(tree, option)
  nextValue = reduceTrees(children, reduce, nextValue, option)

  if (option?.after) {
    option.after(tree)
  }

  return nextValue
}

/**
 * 树形批量组装方法
 * reduceTrees
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} reduce 组装回调函数
 * @param {Any} initialValue 初始化值
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 组装完成的结果
 *
 * @example
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

/**
 * 树形结构重组方法
 * mapTree
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} mapper 重组回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 重组完成的结果
 *
 * @example
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const newTree = mapTree(tree, (child) => {
 *  return { ...child, flag: true }
 * })
 */
export function mapTree(tree, mapper, option = {}) {
  if (!tree) {
    return
  }

  if (isFunction(option?.before)) {
    option.before(tree)
  }

  const data = mapper(tree)

  const { childrenKey = 'children', slotKey = 'slots' } = option

  // 遍历多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      data[slotKey][slotName] = mapTrees(tree[slotKey][slotName], mapper, option)
    })
  }

  // 遍历单个插槽节点
  if (isArray(tree[slotKey])) {
    data[slotKey] = mapTrees(tree[slotKey], mapper, option)
  }

  // 遍历子节点
  data[childrenKey] = mapTrees(tree[childrenKey], mapper, option)

  if (isFunction(option?.after)) {
    option.after(tree)
  }

  return data
}

/**
 * 树形批量重组方法
 * mapTrees
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} mapper 组装回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 重组完成的结果
 *
 * @example
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * const newTrees = mapTrees(trees, (child) => {
 *  return { ...child, flag: true }
 * }, {})
 */
export function mapTrees(trees, mapper, option) {
  if (!isArray(trees)) {
    return []
  }

  return trees.map((tree) => mapTree(tree, mapper, option))
}

/**
 * 树形结构过滤方法
 * filterTree
 *
 * @param {TreeNode} tree 树形根节点
 * @param {Function} filter 过滤回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 过滤完成的结果
 *
 * @example
 *
 * const tree = { id: 1, children: [{ id: 2 }, { id: 3 }] }
 * const newTree = filter(tree, (child) => {
 *  return child.id === 2
 * })
 */
export function filterTree(tree, filter, option = {}) {
  if (!tree) {
    return
  }

  if (isFunction(option?.before)) {
    option.before(tree)
  }

  let isMatched = filter(tree)

  const { childrenKey = 'children', slotKey = 'slots' } = option
  // 遍历多个插槽节点
  if (isObject(tree[slotKey])) {
    Object.keys(tree[slotKey]).forEach((slotName) => {
      tree[slotKey][slotName] = filterTrees(tree[slotKey][slotName], filter, option)
      isMatched = isMatched || !!tree[slotKey][slotName]?.length
    })
  }

  // 遍历单个插槽节点
  if (isArray(tree[slotKey])) {
    tree[slotKey] = filterTrees(tree[slotKey], filter, option)
    isMatched = isMatched || !!tree[slotKey]?.length
  }

  // 遍历子节点
  tree[childrenKey] = filterTrees(tree[childrenKey], filter, option)
  isMatched = isMatched || !!tree[slotKey]?.length

  if (isFunction(option?.after)) {
    option.after(tree)
  }

  return isMatched ? tree : undefined
}

/**
 * 树形批量过滤方法
 * filterTrees
 *
 * @param {TreeNode[]} trees 树形根节点数组
 * @param {Function} filter 过滤回调函数
 * @param {Object} option
 * @param {String} option.childrenKey 子节点的键名，默认为'children'
 * @param {String} option.slotKey 其他子节点容器名，默认为'slots'
 * @param {Function} option.before 访问节点前
 * @param {Function} option.after 访问节点后
 *
 * @returns {Any} 过滤完成的结果
 *
 * @example
 *
 * const trees = [{ id: 1, children: [{ id: 1.1 }, { id: 1.2 }] }, { id: 2 }]
 * const newTrees = filterTrees(trees, (child) => {
 *  return child.id === 1.1
 * }, {})
 */
export function filterTrees(trees, filter, option) {
  if (!isArray(trees)) {
    return []
  }

  return trees.reduce((result, tree) => {
    const node = filterTree(tree, filter, option)
    if (node) {
      result.push(node)
    }

    return result
  }, [])
}
