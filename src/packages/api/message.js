import { message as aMessage } from 'antd'

class Message {
  instance = null

  static create() {
    if (this.instance) {
      return this.instance
    }

    this.instance = new Message()
    return this.instance
  }

  success(content, duration, callback) {
    return aMessage.success(content, duration, callback)
  }

  info(content, duration, callback) {
    return aMessage.info(content, duration, callback)
  }

  warning(content, duration, callback) {
    return aMessage.warning(content, duration, callback)
  }

  error(content, duration, callback) {
    return aMessage.error(content, duration, callback)
  }

  loading(content, duration, callback) {
    return aMessage.loading(content, duration, callback)
  }

  destroy() {
    return aMessage.destroy()
  }
}

export default Message.create()
