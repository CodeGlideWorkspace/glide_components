import EventEngineAbstract from './EventEngineAbstract'

class Event extends EventEngineAbstract {
  /**
   * 触发事件
   *
   * @param {Array<Function>} events 事件列表
   * @param {...any} params 事件参数
   *
   * @returns {Boolean} 是否执行成功
   */
  emit(events = [], ...params) {
    if (!events.length) {
      return false
    }

    events.forEach((event) => {
      event(...params)
    })

    return true
  }
}

export default Event
