import { useRef } from 'react'
import { Form } from 'antd'
import { isFunction } from 'remote:glide_components/utils'

import { FormManage } from './useForm'

function useRules({ required, validators, dependencies, shouldUpdate }) {
  const form = Form.useFormInstance()
  const formManage = useRef(new FormManage(form))

  const rules = []
  if (required) {
    rules.push({ required: true, message: '填写必填项！' })
  }

  const hasValidators = validators && validators.length
  if (!hasValidators) {
    return rules
  }

  function createValidator(validator, ...params) {
    return async (_, value) => {
      const message = await validator(value, ...params)
      if (message) {
        return Promise.reject(new Error(message))
      }
      return Promise.resolve()
    }
  }

  const hasDependencies = (dependencies && !!dependencies.length) || !!shouldUpdate
  if (hasDependencies) {
    validators.forEach((validator) => {
      rules.push(() => {
        return {
          validator: createValidator(validator, formManage.current),
        }
      })
    })
    return rules
  }

  validators.forEach((validator) => {
    rules.push({
      validator: createValidator(validator, formManage.current),
    })
  })

  return rules
}

export default function useAItem({
  name,
  label,
  required,
  dependencies,
  description,
  tooltip,
  hidden,
  labelAlign,
  labelCol,
  wrapperCol,
  noStyle,
  shouldUpdate,
  validators,
  children,
}) {
  const rules = useRules({ required, validators, dependencies, shouldUpdate })

  return {
    props: {
      name,
      label,
      required,
      dependencies,
      extra: description,
      tooltip,
      hidden,
      labelAlign,
      labelCol,
      shouldUpdate,
      wrapperCol,
      noStyle,
      rules,
    },
    children: isFunction(children) ? (form) => children(new FormManage(form)) : children,
  }
}
