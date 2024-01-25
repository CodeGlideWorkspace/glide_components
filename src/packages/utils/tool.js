import { v4 as uuidV4 } from 'uuid'
import classNames from 'classnames'
import merge from 'lodash.merge'

export function uuid() {
  return uuidV4()
}

export { classNames, merge }
