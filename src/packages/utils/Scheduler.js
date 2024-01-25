import { EventEmitter, EventAsyncStream } from './EventEmitter'
import { findTrees, eachTrees, filterTrees } from './tree'

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
   * 最后执行的任务名
   */
  lastedName = ''

  /**
   * 是否已经准备就绪
   */
  isReady = false

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

  getData(name) {
    return this.result[name]
  }

  getResult() {
    if (!this.lastedName) {
      return
    }

    return this.result[this.lastedName]
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
   *
   * @returns {Promise<Void>}
   */
  async exec(nodes) {
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
        const task = Promise.resolve(this.eventEmitter.emit(item.name)).then((res) => {
          this.lastedName = item.name
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

    if (!this.isReady) {
      return () => {
        this.unsubscribe(name)
      }
    }

    // 添加节点时，如果已经时ready状态，则直接执行
    const node = findTrees(this.nodes, (item) => item.name === name)
    if (node) {
      this.exec([node])
    }

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

    if (!this.isReady) {
      return isRemoved
    }

    // 更新节点时，如果已经时ready状态，则直接执行
    const node = findTrees(this.nodes, (item) => item.name === name)
    if (node) {
      this.exec([node])
    }

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
   *
   * @returns {Promise<Void>}
   */
  async publish(name) {
    if (!name) {
      this.result = {}
      this.isReady = true
      await this.exec(this.nodes)
      return
    }

    const node = findTrees(this.nodes, (item) => item.name === name)
    if (!node) {
      return
    }

    await this.exec(node.children)
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
