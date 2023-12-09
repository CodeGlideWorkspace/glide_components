import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncStream extends EventEngineAbstract {
  /**
   * 触发异步事件流
   *
   * @param {Any} params 事件参数
   *
   * @returns {Any}
   */
  async emit(params) {
    if (!this.events.length) {
      return
    }

    let result
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i]
      result = await event(params, result)
    }

    return result
  }
}

export default EventAsyncStream
