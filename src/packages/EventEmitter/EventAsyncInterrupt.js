import { isFalse } from 'remote:glide_components/utils'

import EventEngineAbstract from './EventEngineAbstract'

class EventAsyncInterrupt extends EventEngineAbstract {
  /**
   * 异步串行可中断触发事件
   *
   * @param {...any} params 事件参数
   *
   * @returns {Void}
   */
  async emit(...params) {
    if (!this.events.length) {
      return
    }

    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i]
      const isContinue = await event(...params)
      if (isFalse(isContinue)) {
        break
      }
    }
  }
}

export default EventAsyncInterrupt
