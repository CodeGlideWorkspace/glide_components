import EventEngineAbstract from './EventEngineAbstract'

class EventStream extends EventEngineAbstract {
  /**
   * 触发事件流
   *
   * @param {Array<Function>} events 事件列表
   * @param {Any} params 事件参数
   *
   * @returns {Any}
   */
  emit(events = [], params) {
    if (!events.length) {
      return
    }

    return events.reduce((result, event) => {
      return event(params, result)
    }, undefined)
  }
}

export default EventStream
