import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncSerial extends EventEngineAbstract {
  /**
   * 异步串行触发事件
   *
   * @param {Array<Function>} events 事件列表
   * @param {...any} params 事件参数
   *
   * @returns {Boolean} 是否执行成功
   */
  async emit(events = [], ...params) {
    if (!events.length) {
      return false
    }

    for (let i = 0; i < events.length; i++) {
      await events[i](...params)
    }

    return true
  }
}

export default EventAsyncSerial
