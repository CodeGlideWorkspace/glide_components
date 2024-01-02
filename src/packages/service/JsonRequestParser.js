import RequestParserAbstract from './RequestParserAbstract'

class JsonRequestParser extends RequestParserAbstract {
  parseHeaders(request, headers = {}) {
    return {
      'Accept': headers.Accept?.includes('application/json') ? headers.Accept : 'application/json',
      'Content-Type': headers['Content-Type']?.includes('application/json')
        ? headers['Content-Type']
        : 'application/json',
      ...headers,
    }
  }

  parseBody(request, params = {}) {
    return JSON.stringify(params)
  }
}

export default JsonRequestParser
