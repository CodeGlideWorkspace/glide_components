import { isFalse } from '../is'

import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncInterrupt extends EventEngineAbstract {
  /**
   * 异步串行可中断触发事件
   *
   * @param {Array<Function>} events 事件列表
   * @param {...any} params 事件参数
   *
   * @returns {Void}
   */
  async emit(events = [], ...params) {
    if (!events.length) {
      return
    }

    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const isContinue = await event(...params)
      if (isFalse(isContinue)) {
        break
      }
    }
  }
}

export default EventAsyncInterrupt
