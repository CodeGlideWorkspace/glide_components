import { isFunction, isString } from '../is'
import { uuid } from '../tool'
import EventEngineAbstract from './EventEngineAbstract'
import Event from './Event'

class EventEmitter {
  /**
   * 存储事件句柄
   *
   * @type {Object<{ [eventName]: Array[{ eventId, Engine, event }] }>}
   * {
   *  [EVENT_NAME]: [{
   *    eventId: String,
   *    Engine: EventEngine,
   *    event: Function,
   *  }]
   * }
   */
  events = {}

  /**
   * 注册事件
   *
   * @param {String} name 事件名称
   * @param {Function} event 事件句柄
   * @param {?EventEngine} EventEngine 可选，注册使用的事件引擎
   *
   * @returns {String} eventId 可用于注销事件
   */
  on(name, event, EventEngine = Event) {
    if (!isString(name)) {
      return
    }

    if (!isFunction(event)) {
      return
    }

    if (!this.events[name]) {
      this.events[name] = []
    }

    const eventId = uuid()
    this.events[name].push({
      eventId,
      event,
      Engine: EventEngine,
    })

    return eventId
  }

  /**
   * 注销事件
   *
   * @param {String} name 事件名称
   * @param {Function | String} eventOrEventId 事件句柄或事件id
   * @param {?EventEngine} EventEngine 可选，传递时仅注销对应事件引擎的事件
   *
   * @returns {Boolean} 是否注销成功，不存在时返回注销失败
   */
  off(name, eventOrEventId, EventEngine = Event) {
    if (!isString(name)) {
      return
    }

    if (!isString(eventOrEventId) && !isFunction(eventOrEventId)) {
      return
    }

    if (!this.events[name]) {
      return false
    }

    const events = this.events[name].filter((item) => {
      if (item.Engine !== EventEngine) {
        return false
      }

      if (isString(eventOrEventId)) {
        return item.eventId === eventOrEventId
      }

      return item.event === eventOrEventId
    })

    const returnValue = events.length < this.events[name].length
    this.events[name] = events

    return returnValue
  }

  /**
   * 清空事件
   *
   * @param {?String} name 可选，需要清理的事件名称，不传时清理所有事件
   * @param {?EventEngine} EventEngine 可选，传递时仅清理对应事件引擎的事件
   *
   * @returns {Void}
   */
  clear(name, EventEngine) {
    if (!name && !EventEngine) {
      this.events = {}
      return
    }

    if (!name) {
      Object.keys(this.events).forEach((eventName) => {
        this.events[eventName] = this.events[eventName].filter((item) => item.Engine !== EventEngine)
      })
      return
    }

    if (!EventEngine) {
      delete this.events[name]
      return
    }

    this.events[name] = this.events[name].filter((item) => item.Engine !== EventEngine)
  }

  /**
   * 触发事件
   *
   * @param {String} name 事件名称
   * @param {?EventEngine} 事件使用的引擎，不传时使用默认引擎
   * @param {...any} params 事件参数
   *
   * @returns {Any}
   */
  emit(name, EventEngine, ...params) {
    if (!isString(name)) {
      return
    }

    const events = this.events[name]
    if (!events) {
      return
    }

    let CurrentEventEngine = Event
    if (EventEngine instanceof EventEngineAbstract) {
      CurrentEventEngine = EventEngine
    } else {
      params.unshift(EventEngine)
    }

    const engineEvents = events.filter((item) => item.Engine === CurrentEventEngine).map((item) => item.event)
    const engine = new CurrentEventEngine()
    engine.setEvents(engineEvents)

    return engine.emit(...params)
  }
}

export default EventEmitter
