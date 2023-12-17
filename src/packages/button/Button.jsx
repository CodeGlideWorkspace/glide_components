import React from 'react'
import { Button as AButton } from 'antd'
import propTypes from 'prop-types'

import useButton from './useButton'

function Button(props) {
  const { props: aProps } = useButton(props)
  return <AButton {...aProps}>{props.children}</AButton>
}

Button.propTypes = {
  type: propTypes.oneOf(['primary', 'dashed', 'link', 'text', 'default']),
  loading: propTypes.oneOfType([propTypes.bool, propTypes.object]),
  disabled: propTypes.bool,
  icon: propTypes.node,
  onClick: propTypes.func,
  styles: propTypes.object,
  classNames: propTypes.object,
}

export default Button
