import EventEngineAbstract from './EventEngineAbstract'

class Event extends EventEngineAbstract {
  /**
   * 触发事件
   *
   * @param {...any} params 事件参数
   *
   * @returns {Boolean} 是否执行成功
   */
  emit(...params) {
    if (!this.events.length) {
      return false
    }

    this.events.forEach((event) => {
      event(...params)
    })

    return true
  }
}

export default Event
