import RequestParserAbstract from './RequestParserAbstract'

class FormRequestParser extends RequestParserAbstract {
  parseBody(request, params = {}) {
    const data = new FormData()
    Object.keys(params).forEach((key) => {
      data.append(key, params[key])
    })
    return data
  }
}

export default FormRequestParser
