import EventEngineAbstract from './EventEngineAbstract'

class EventAsync extends EventEngineAbstract {
  /**
   * 异步并行触发事件
   *
   * @param {...any} params 事件参数
   *
   * @returns {Boolean} 是否执行成功
   */
  async emit(...params) {
    if (!this.events.length) {
      return false
    }

    const tasks = this.events.reduce((result, event) => {
      result.push(event(...params))
      return result
    }, [])

    const returnValue = await Promise.all(tasks)
      .then(() => true)
      .catch((e) => {
        console.error(e)
        return false
      })

    return returnValue
  }
}

export default EventAsync
