import { isObject } from 'remote:glide_components/utils'

import Request from './Request'
import Response from './Response'
import FormRequestParser from './FormRequestParser'

function checkSuccess(res) {
  if (!isObject(res)) {
    return res
  }

  const code = `${res.code || ''}`
  if (code !== '200') {
    const error = new Error(res.message)
    error.response = res
    throw error
  }

  return res
}

export function request(url, option) {
  const request = new Request(url, option)
  return fetch(...request.getData())
    .then((res) => {
      const response = new Response(res)
      return response.getData()
    })
    .then(checkSuccess)
}

export function requestForm(url, option) {
  const request = new Request(url, option)
  request.setParser(new FormRequestParser())
  return fetch(...request.getData())
    .then((res) => {
      const response = new Response(res)
      return response.getData()
    })
    .then(checkSuccess)
}
