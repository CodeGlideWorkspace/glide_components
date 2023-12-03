import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/react/shallow'
import { isUndefined } from 'remote:glide_components/utils'

// 是否开启redux-devtools调试模式
const IS_ENABLED_DEVTOOLS = process.env.NODE_ENV === 'development'

/**
 * 生成设置函数
 *
 * @param {Function} set zustand原始的set函数
 * @param {Function} action 动作函数
 *
 * @returns {Function} (immerState) => {}
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
  return create(immer(devtools(store, { showName, enabled: IS_ENABLED_DEVTOOLS })))
}

/**
 * 创建浅对比存储对象
 *
 * @param {Function} useStore 存储对象函数
 * @returns
 */
export function createShadowStore(useStore) {
  return function (...rest) {
    const shadow = useShallow(...rest)
    return useStore(shadow)
  }
}
