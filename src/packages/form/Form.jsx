import React, { forwardRef, useImperativeHandle } from 'react'

import { useForm } from './useForm'

function Form(props, ref) {
  const { handleConfirm, confirm, reset, getValue, setValue, validate, getData, focus } = useForm(props)

  useImperativeHandle(ref, () => {
    return {
      confirm,
      reset,
      validate,
      getValue,
      setValue,
      getData,
      focus,
    }
  })

  return <form onSubmit={handleConfirm}>{props?.children}</form>
}

export default forwardRef(Form)
