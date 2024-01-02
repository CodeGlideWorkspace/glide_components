class RequestParserAbstract {
  parseHeaders(request, headers) {
    return headers
  }

  parseBody(request, params) {}
}

export default RequestParserAbstract
