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

/**
 * 请求JSON格式
 *
 * @param {String} url 请求地址, 支持restful风格参数
 * @param {String} option.method 请求方法
 * @param {String} option.credentials 是否携带cookies
 * @param {Object} option.headers 请求头信息
 * @param {Object} option.params 请求参数
 *
 * @returns
 */
export function request(url, option) {
  const request = new Request(url, option)
  return fetch(...request.getData())
    .then((res) => {
      const response = new Response(res)
      return response.getData()
    })
    .then(checkSuccess)
}

/**
 * 请求表单格式
 *
 * @param {String} url 请求地址, 支持restful风格参数
 * @param {String} option.method 请求方法
 * @param {String} option.credentials 是否携带cookies
 * @param {Object} option.headers 请求头信息
 * @param {Object} option.params 请求参数
 *
 * @returns
 */
export function requestForm(url, option) {
  const request = new Request(url, option, new FormRequestParser())
  return fetch(...request.getData())
    .then((res) => {
      const response = new Response(res)
      return response.getData()
    })
    .then(checkSuccess)
}
