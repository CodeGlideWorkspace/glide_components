import React, { forwardRef } from 'react'
import { Radio as ARadio } from 'antd'
import propTypes from 'prop-types'

import useRadio from './useRadio'

const Radio = forwardRef(function (props, ref) {
  const { props: aProps, ref: aRef } = useRadio(props, ref)

  return <ARadio.Group ref={aRef} {...aProps} />
})

Radio.defaultProps = {
  onChange() {},
}

Radio.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  disabled: propTypes.bool,

  value: propTypes.oneOfType([propTypes.string, propTypes.number]),

  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),

  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      disabled: propTypes.bool,
    }),
  ),

  type: propTypes.oneOf(['button', 'default']),

  onChange: propTypes.func,
}

export default Radio
