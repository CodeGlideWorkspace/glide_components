/**
 * 事件触发引擎接口类
 */
class EventEngineAbstract {
  /**
   * 事件触发
   *
   * @returns {Void}
   */
  emit(events = [], ...params) {}
}

export default EventEngineAbstract
