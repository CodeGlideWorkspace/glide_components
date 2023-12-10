function check(data, type) {
  return Object.prototype.toString.call(data) === type
}

export function isString(data) {
  return check(data, '[object String]')
}

export function isObject(data) {
  return check(data, '[object Object]')
}

export function isArray(data) {
  return Array.isArray(data)
}

export function isNull(data) {
  return check(data, '[object Null]')
}

export function isNaN(data) {
  // eslint-disable-next-line
  return data !== data
}

export function isNumber(data) {
  return check(data, '[object Number]') && !isNaN(data)
}

export function isBoolean(data) {
  return check(data, '[object Boolean]')
}

export function isUndefined(data) {
  return check(data, '[object Undefined]')
}

export function isFunction(data) {
  return check(data, '[object Function]')
}

export function isValuable(data) {
  return !isUndefined(data) && !isNull(data) && !isNaN(data) && data !== ''
}

export function isFalse(data) {
  return isBoolean(data) && !data
}
