import { isArray, isString, isNumber } from 'remote:glide_components/utils'

import RequestParserAbstract from './RequestParserAbstract'
import JsonRequestParser from './JsonRequestParser'

function toUppercaseWords(str) {
  // 将字符串按照 - 进行分割
  const words = str.split('-')
  // 使用 map()方法将每个单词的首字母大写
  const upperCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  // 使用 join('-')方法将所有单词重新组合起来
  const result = upperCaseWords.join('-')
  return result
}

// 替换冒号参数
function replaceColonParams(path, params = {}) {
  let url = path
  const body = {}
  const match = url.match(/\/:(\w+)/g)

  if (isArray(match)) {
    match.forEach((v) => {
      const key = v.replace('/:', '')
      const param = params[key]
      if (isString(param) || isNumber(param)) {
        url = url.replace(v, `/${param}`)
        return
      }
      body[key] = params[key]
    })
  }

  return { url, params: body }
}

class Request {
  // 存储url地址
  url = null

  // 请求方法
  method = 'GET'
  // 允许的请求方法
  allowMethods = ['GET', 'POST', 'PUT', 'DELETE']

  // 请求头信息
  headers = {}

  // 请求参数信息
  body = undefined

  // 是否携带cookies，默认不携带
  credentials = 'omit'
  // 允许的携带cookies的值
  allowCredentials = ['same-origin', 'include', 'omit']

  // 存储解析器
  static parser = new JsonRequestParser()

  constructor(url, option = {}) {
    this.setMethod(option.method)
    this.setCredential(option.credentials)
    this.setHeaders(option.headers)
    const params = this.setUrl(url, option.params)
    this.setBody(params)
  }

  getData() {
    return [
      this.url.href,
      {
        method: this.method,
        headers: this.headers,
        body: this.body,
        credentials: this.credentials,
      },
    ]
  }

  setUrl(path, params) {
    const { url, params: nextParams } = replaceColonParams(path, params)
    this.url = new URL(url)
    if (['GET', 'DELETE'].includes(this.method)) {
      Object.keys(nextParams).forEach((key) => {
        this.url.searchParams.append(key, nextParams[key])
      })
      return {}
    }

    return nextParams
  }

  setMethod(method = 'GET') {
    const upperMethod = method.toUpperCase()
    if (this.allowMethods.includes(upperMethod)) {
      this.method = upperMethod
    }
  }

  setCredential(credentials = 'omit') {
    if (this.allowCredentials.includes(credentials)) {
      this.credentials = credentials
    }
  }

  setHeaders(headers) {
    const formatHeaders = Object.keys(headers).reduce((result, key) => {
      result[toUppercaseWords(key)] = result[key]
      return result
    }, {})

    this.headers = this.parser.parseHeaders(this, formatHeaders)
  }

  setParser(parser) {
    if (parser instanceof RequestParserAbstract) {
      this.parser = parser
    }
  }

  setBody(params) {
    this.body = this.parser.parseBody(this, params)
  }
}

export default Request
