import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncSerial extends EventEngineAbstract {
  /**
   * 异步串行触发事件
   *
   * @param {...any} params 事件参数
   *
   * @returns {Boolean} 是否执行成功
   */
  async emit(...params) {
    if (!this.events.length) {
      return false
    }

    for (let i = 0; i < this.events.length; i++) {
      await this.events[i](...params)
    }

    return true
  }
}

export default EventAsyncSerial
