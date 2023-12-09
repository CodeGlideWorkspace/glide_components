import { isFunction } from '../is'

/**
 * 事件触发引擎接口类
 */
class EventEngineAbstract {
  /**
   * 存储事件句柄
   *
   * @type {Array[Function]}
   */
  events = []

  setEvents(events = []) {
    this.events = events.filter((event) => isFunction(event))
  }

  /**
   * 事件触发
   *
   * @returns {Void}
   */
  emit() {}
}

export default EventEngineAbstract
