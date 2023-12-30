import { EventEmitter, EventAsyncStream } from './EventEmitter'
import { findTrees, eachTrees, reduceTrees, filterTrees } from './tree'
import { isString } from './is'

class Node {
  // 节点名称
  name = ''

  // 子节点
  children = []

  // 节点依赖
  dependencies = []

  constructor(option) {
    this.name = option.name
    this.dependencies = option.dependencies || []
  }

  push(node) {
    this.children.push(node)
  }
}

class Scheduler {
  /**
   * 事件触发，使用异步流模式
   */
  eventEmitter = new EventEmitter(new EventAsyncStream())

  /**
   * 节点树
   *
   * @type {Array<Node>}
   */
  nodes = []

  /**
   * 存储执行结果
   */
  result = {}

  /**
   * 孤儿节点
   *
   * @type {Object<{ [parentNodeName]: Array<Node> }>}
   */
  orphanNodes = {}

  /**
   * 记录隐藏的组件
   *
   * @type {Object<{ [name]: boolean }>}
   */
  hidden = {}

  show(name) {
    this.hidden[name] = false
  }

  hide(name) {
    this.hidden[name] = true
  }

  /**
   * 获取依赖项参数
   *
   * @param {Object} context 上下文参数
   *
   * @returns {Object}
   */
  getParams(node, context) {
    const params = reduceTrees(
      this.nodes,
      (result, item) => {
        if (node.dependencies.includes(item.name)) {
          return { ...result, ...this.result[item.name] }
        }

        return result
      },
      context,
    )

    return params
  }

  /**
   * 链接孤儿节点
   *
   * @param {Node} node 节点
   *
   * @returns {Void}
   */
  linkOrphanNodes(node) {
    const nodes = this.orphanNodes[node.name]
    if (!nodes?.length) {
      return
    }

    delete this.orphanNodes[node.name]
    nodes.forEach((n) => {
      node.children.push(n)
      this.linkOrphanNodes(n)
    })
  }

  /**
   * 保存孤儿节点
   *
   * @param {Node} node 节点
   * @param {String} parentNodeName 父节点名称
   *
   * @returns {Void}
   */
  saveOrphanNode(node, parentNodeName) {
    if (!this.orphanNodes[parentNodeName]) {
      this.orphanNodes[parentNodeName] = []
    }

    this.orphanNodes[parentNodeName].push(node)
  }

  /**
   * 节点关系建立
   *
   * @param {Node} node 节点
   * @param {String} parentNodeName 父节点名称
   *
   * @returns {Void}
   */
  linkNode(node, parentNodeName) {
    if (!parentNodeName) {
      this.nodes.push(node)
      this.linkOrphanNodes(node)
      return
    }

    const parentNode = findTrees(this.nodes, (n) => n.name === parentNodeName)
    // 父节点不存在时，可能是因为顺序导致父节点还未注册，因此暂时存在孤儿节点中
    if (!parentNode) {
      this.saveOrphanNode(node, parentNodeName)
      return
    }

    // 添加到父节点中
    parentNode.children.push(node)
    // 添加当前节点的孤儿节点
    this.linkOrphanNodes(node)
  }

  /**
   * 根据依赖关系执行节点
   *
   * @param {Array<Node>} nodes 待执行节点列表
   * @param {Any} context 执行的上下文参数
   *
   * @returns {Promise<Void>}
   */
  async exec(nodes, context) {
    // 访问记录
    const visited = {}
    // 获取待执行的节点
    let needExecNodes = []
    eachTrees(nodes, (item) => {
      needExecNodes.push(item)
      visited[item.name] = false
    })

    let prevCount = 0
    while (needExecNodes.length && (!prevCount || prevCount !== needExecNodes.length)) {
      prevCount = needExecNodes.length
      const { readyNodes, unReadyNodes } = needExecNodes.reduce(
        (result, item) => {
          const ready = item.dependencies.every((parentNodeName) => {
            return this.hidden[parentNodeName] || !(parentNodeName in visited) || visited[parentNodeName]
          })
          ready ? result.readyNodes.push(item) : result.unReadyNodes.push(item)

          return result
        },
        { readyNodes: [], unReadyNodes: [] },
      )

      needExecNodes = unReadyNodes

      const tasks = readyNodes.reduce((result, item) => {
        const task = Promise.resolve(this.eventEmitter.emit(item.name, this.getParams(item, context))).then((res) => {
          this.result[item.name] = res
          return res
        })

        result.push(task)
        visited[item.name] = true
        return result
      }, [])

      await Promise.all(tasks).catch((error) => {
        console.error(error)
      })
    }
  }

  /**
   * 创建节点，同时建立关系
   *
   * @param {String} name 名称
   * @param {Array<String>} dependencies 依赖节点列表
   *
   * @returns {Void}
   */
  create(name, dependencies = []) {
    // 不存在依赖时，链接节点到根节点
    if (!dependencies.length) {
      this.linkNode(new Node({ name, dependencies }))
      return
    }

    // 存在依赖时，链接节点到依赖节点
    dependencies.forEach((parentNodeName) => {
      this.linkNode(new Node({ name, dependencies }), parentNodeName)
    })
  }

  /**
   * 订阅更新
   *
   * @param {String} name 名称
   * @param {Function} handle 更新触发的句柄
   * @param {Array<String>} dependencies 依赖的项名称
   *
   * @returns {Void}
   */
  subscribe(name, handle, dependencies = []) {
    this.create(name, dependencies)
    this.eventEmitter.on(name, handle)

    return () => {
      this.unsubscribe(name)
    }
  }

  /**
   * 更新订阅依赖
   *
   * @param {String} name 名称
   * @param {Array<String>} dependencies 依赖的项名称
   *
   * @returns {Boolean} 是否更新成功
   */
  update(name, dependencies) {
    const isRemoved = this.remove(name)
    if (!isRemoved) {
      return isRemoved
    }
    this.create(name, dependencies)
    return isRemoved
  }

  /**
   *
   * @param {String} name 名称
   *
   * @returns {Boolean} 是否删除成功
   */
  remove(name) {
    const isExist = findTrees(this.nodes, (n) => n.name === name)
    if (!isExist) {
      return !!isExist
    }

    this.nodes = filterTrees(this.nodes, (n) => {
      return n.name !== name
    })
    return !!isExist
  }

  /**
   * 删除订阅
   *
   * @param {String} name 名称
   *
   * @returns {Boolean} 是否删除成功
   */
  unsubscribe(name) {
    const isExist = this.remove(name)
    this.eventEmitter.clear(name)
    return isExist
  }

  /**
   * 发布更新
   *
   * @param {String?} name 组件名称
   * @param {Object} context 执行的上下文参数
   *
   * @returns {Promise<Void>}
   */
  async publish(name, context) {
    const itemName = isString(name) ? name : undefined
    const data = isString(name) ? context : name

    if (!itemName) {
      this.result = {}
      await this.exec(this.nodes, data)
      return
    }

    const node = findTrees(this.nodes, (item) => item.name === itemName)
    if (!node) {
      return
    }

    await this.exec(node.children, data)
  }

  /**
   * 检测是否已经订阅
   *
   * @param {String} name 名称
   *
   * @returns {Boolean} 是否注册结果
   */
  has(name) {
    return !!findTrees(this.nodes, (item) => item.name === name)
  }
}

export default Scheduler
