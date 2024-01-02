const parser = {
  'text/plain': (response) => response.text(),
  'application/json': (response) => response.json(),
  'application/octet-stream': (response) => response.blob(),
}

class Response {
  // 原始的响应结果
  raw = null

  constructor(res) {
    this.raw = res
  }

  getData() {
    const contentType = this.raw.headers.get('Content-Type')
    const parserKey = Object.keys(parser).find((key) => contentType.includes(key))
    if (!parserKey) {
      const error = new Error('未知的响应类型')
      error.response = this.raw
      throw error
    }

    if (!this.raw.ok) {
      const error = new Error(this.raw.statusText)
      error.response = this.raw
      throw error
    }

    return parser[parserKey](this.raw)
  }
}

export default Response
