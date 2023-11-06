import { useForm as useRForm } from 'react-hook-form'

// 默认提交函数
function handleDefaultConfirm() {
  // no action
}

function useForm({ value, defaultValue, onConfirm = handleDefaultConfirm } = {}) {
  const {
    handleSubmit,
    reset: rReset,
    setValue: rSetValue,
    getValues: rGetValues,
    trigger: rTrigger,
    setFocus: rSetFocus,
  } = useRForm({
    values: value,
    defaultValues: defaultValue,
  })
  const handleConfirm = handleSubmit(onConfirm)

  /**
   * 重置表单项
   * @return void
   */
  function reset() {
    rReset(undefined, { keepDefaultValues: true })
  }

  /**
   * 设置表单项的值
   * @param {String} name 需要重置的表单项名称
   * @param {Any} value 设置表单项的值
   * @param {Object} option
   * @param {Boolean} option.shouldValidate 是否需要验证
   * @return void
   */
  function setValue(name, value, option = {}) {
    rSetValue(name, value, { shouldValidate: option.shouldValidate })
  }

  /**
   * 获取表单项的值
   * @param {String} name 需要获取的表单项名称
   * @return {Any} 表单项的值
   */
  function getValue(name) {
    return rGetValues(name)
  }

  /**
   * 获取整个表单数据
   * @return {Object} 真个表单数据
   */
  function getData() {
    return rGetValues()
  }

  /**
   * 验证表单
   * @return {Boolean} 是否验证通过
   */
  async function validate() {
    const isValid = await rTrigger()
    return isValid
  }

  /**
   * 提交表单值
   * @return void
   */
  async function confirm() {
    const isValid = await validate()
    if (isValid) {
      onConfirm(getData())
    }
  }

  /**
   * 聚焦表单项
   * @param {String} name 需要重置的表单项名称
   * @return void
   */
  function focus(name) {
    rSetFocus(name)
  }

  return { handleConfirm, reset, setValue, getValue, validate, confirm, focus }
}

export { useForm }
