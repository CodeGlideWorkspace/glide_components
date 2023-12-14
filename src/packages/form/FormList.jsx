import React from 'react'
import propTypes from 'prop-types'
import { Form as AForm } from 'antd'

function FormList({ name, children }) {
  return <AForm.List name={name}>{children}</AForm.List>
}

FormList.propTypes = {
  /**
   * 表单项名称
   */
  name: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),
}

export default FormList
