import EventEngineAbstract from './EventEngineAbstract'

class EventStream extends EventEngineAbstract {
  /**
   * 触发事件流
   *
   * @param {Any} params 事件参数
   *
   * @returns {Any}
   */
  emit(params) {
    if (!this.events.length) {
      return
    }

    return this.events.reduce((result, event) => {
      return event(params, result)
    }, undefined)
  }
}

export default EventStream
