import { create, useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { temporal } from 'zundo'
import { isUndefined } from 'remote:glide_components/utils'

// 是否开启redux-devtools调试模式
const IS_ENABLED_DEVTOOLS = process.env.NODE_ENV === 'development'

/**
 * 生成设置函数
 *
 * @param {Function} set zustand原始的set函数
 * @param {Function} action 动作函数
 *
 * @returns {Function} (handle, replace) => void
 */
function createSet(set, action) {
  return function (handle, replace) {
    set(handle, isUndefined(replace) ? false : replace, action)
  }
}

/**
 * 生成动作创建函数
 *
 * @param {Function} set zustand原始的set函数
 * @param {Function} get zustand原始的get函数
 *
 * @returns {Function} ActionCreator() 动作创建函数
 *
 * 动作创建函数
 * ActionCreator(action, actionName)
 *
 * @param {Function} action 动作函数
 * @param {String?} actionName 可选参数，动作名称，当action是匿名函数时，需要传入动作名称
 *
 * @returns {Function} Action 动作执行函数
 *
 * 动作执行函数
 * Action(payload)
 *
 * @param {Any} payload 动作参数
 *
 * @returns {Void}
 */
export function createAction(set, get) {
  return function (action, actionName) {
    return function (payload) {
      const operator = { set, get }
      if (IS_ENABLED_DEVTOOLS) {
        operator.set = createSet(set, { type: action.name || actionName, payload })
      }

      return action(payload, operator)
    }
  }
}

/**
 * 生成存储对象store
 *
 * @param {Function} store 存储对象创建函数
 * @param {String?} name 可选，，存储对象名称，当store为匿名函数时，需要传入存储对象名称
 *
 * @returns {Hook}
 */
export function createStore(store, name) {
  const showName = store.name || name
  return create(immer(devtools(store, { name: showName, enabled: IS_ENABLED_DEVTOOLS })))
}

/**
 * 生成可撤销/重做的存储对象store
 *
 * @param {Function} store 存储对象创建函数
 * @param {String?} name 可选，，存储对象名称，当store为匿名函数时，需要传入存储对象名称
 * @param {Object} option 历史插件的选项 https://github.com/charkour/zundo
 *
 * @returns {Hook}
 */
export function createHistoryStore(store, name, option) {
  const showName = store.name || name
  return create(devtools(temporal(immer(store), option), { name: showName, enabled: IS_ENABLED_DEVTOOLS }))
}

/**
 * 获取撤销/重做的管理hook
 *
 * @param {Object} store zustand存储对象函数
 * @param {Function} selector 状态选择器
 * @param {Function} equality 状态变更对比函数
 *
 * @returns {Hook}
 */
export function getHistoryStore(store, selector, equality) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStore(store.temporal, selector, equality)
}

/**
 * 创建快速选择器
 *
 * @param {Object} zStore zustand存储对象函数
 * @returns {Hook}
 */
export function withSelector(zStore) {
  zStore.use = {}
  for (const k of Object.keys(zStore.getState())) {
    zStore.use[k] = () => zStore((s) => s[k])
  }

  return zStore
}
