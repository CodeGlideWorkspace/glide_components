import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncStream extends EventEngineAbstract {
  /**
   * 触发异步事件流
   *
   * @param {Array<Function>} events 事件列表
   * @param {Any} params 事件参数
   *
   * @returns {Any}
   */
  async emit(events = [], params) {
    if (!events.length) {
      return
    }

    let result
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      result = await event(params, result)
    }

    return result
  }
}

export default EventAsyncStream
