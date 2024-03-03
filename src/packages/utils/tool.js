import { v4 as uuidV4 } from 'uuid'
import classNames from 'classnames'
import merge from 'lodash.merge'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import { produce as immer } from 'immer'

export function uuid() {
  return uuidV4()
}

export { classNames, merge, immer, throttle, debounce }
