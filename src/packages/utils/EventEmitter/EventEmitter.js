import { isFunction, isString } from '../is'
import { uuid } from '../tool'
import EventEngineAbstract from './EventEngineAbstract'
import Event from './Event'

class EventEmitter {
  /**
   * 存储事件句柄
   *
   * @type {Object<{ [eventName]: Array[{ eventId, engine, event }] }>}
   * {
   *  [EVENT_NAME]: [{
   *    eventId: String,
   *    engine: EventEngine,
   *    event: Function,
   *  }]
   * }
   */
  events = {}

  /**
   * 默认事件引擎
   */
  engine = new Event()

  constructor(engine) {
    if (engine instanceof EventEngineAbstract) {
      this.engine = engine
    }
  }

  getEngine(engine) {
    if (engine instanceof EventEngineAbstract) {
      return engine
    }

    return this.engine
  }

  setEngine(engine) {
    if (engine instanceof EventEngineAbstract) {
      this.engine = engine
    }
  }

  /**
   * 注册事件
   *
   * @param {String} name 事件名称
   * @param {Function} event 事件句柄
   * @param {?EventEngine} eventEngine 可选，注册使用的事件引擎
   *
   * @returns {String} eventId 可用于注销事件
   */
  on(name, event, eventEngine) {
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
      engine: this.getEngine(eventEngine),
    })

    return eventId
  }

  /**
   * 注销事件
   *
   * @param {String} name 事件名称
   * @param {Function | String} eventOrEventId 事件句柄或事件id
   * @param {?EventEngine} eventEngine 可选，传递时仅注销对应事件引擎的事件
   *
   * @returns {Boolean} 是否注销成功，不存在时返回注销失败
   */
  off(name, eventOrEventId, eventEngine) {
    if (!isString(name)) {
      return
    }

    if (!isString(eventOrEventId) && !isFunction(eventOrEventId)) {
      return
    }

    if (!this.events[name]) {
      return false
    }

    const engine = this.getEngine(eventEngine)
    const events = this.events[name].filter((item) => {
      if (item.engine !== engine) {
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
   * @param {?EventEngine} eventEngine 可选，传递时仅清理对应事件引擎的事件
   *
   * @returns {Void}
   */
  clear(name, eventEngine) {
    const engine = eventEngine instanceof EventEngineAbstract ? eventEngine : undefined

    if (!name && !engine) {
      this.events = {}
      return
    }

    if (!name) {
      Object.keys(this.events).forEach((eventName) => {
        this.events[eventName] = this.events[eventName].filter((item) => item.engine !== engine)
      })
      return
    }

    if (!engine) {
      delete this.events[name]
      return
    }

    this.events[name] = this.events[name].filter((item) => item.engine !== engine)
  }

  /**
   * 触发事件
   *
   * @param {String} name 事件名称
   * @param {?EventEngine} eventEngine 事件使用的引擎，不传时使用默认引擎
   * @param {...any} params 事件参数
   *
   * @returns {Any}
   */
  emit(name, eventEngine, ...params) {
    if (!isString(name)) {
      return
    }

    const events = this.events[name]
    if (!events) {
      return
    }

    const engine = this.getEngine(eventEngine)
    if (!(eventEngine instanceof EventEngineAbstract)) {
      params.unshift(eventEngine)
    }

    const engineEvents = events.filter((item) => item.engine === engine).map((item) => item.event)
    return engine.emit(engineEvents, ...params)
  }
}

export default EventEmitter
