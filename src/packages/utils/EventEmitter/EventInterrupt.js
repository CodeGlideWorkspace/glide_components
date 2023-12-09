import { isFalse } from '../is'
import EventEngineAbstract from './EventEngineAbstract'

class EventInterrupt extends EventEngineAbstract {
  /**
   * 可中断触发事件
   *
   * @param {...any} params 事件参数
   *
   * @returns {Void}
   */
  emit(...params) {
    if (!this.events.length) {
      return
    }

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i]
      const isContinue = event(...params)
      if (isFalse(isContinue)) {
        break
      }
    }
  }
}

export default EventInterrupt
