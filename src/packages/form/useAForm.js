import { useRef } from 'react'
import useForm from './useForm'

export default function useAForm({
  form,
  layout,
  disabled,
  initialValues,
  labelAlign,
  labelCol,
  wrapperCol,
  onSubmit,
  onChange,
}) {
  const userFormManage = useRef(form)
  const sysFormManage = useForm()

  // 不存在用户传递的form实例，使用系统创建的实例代替
  if (!userFormManage.current) {
    userFormManage.current = sysFormManage
  }

  function onFinish(values) {
    onSubmit(values)
  }

  function onValuesChange(changedValues, values) {
    onChange(changedValues, values)
  }

  return {
    props: {
      form: userFormManage.current.getForm(),
      layout,
      disabled,
      initialValues,
      labelAlign,
      labelCol,
      wrapperCol,
      labelWrap: true,
      preserve: false,
      scrollToFirstError: true,
      onFinish,
      onValuesChange,
    },
  }
}
