import React from 'react'
import { ConfigProvider as AConfigProvider, theme as ATheme } from 'antd'
import propTypes from 'prop-types'
import merge from 'lodash.merge'

function ConfigProvider({ theme, size, children, ...props }) {
  const themeConfig = merge(
    {
      token: {
        colorPrimary: '#26997b',
        colorInfo: '#26997b',
        colorError: '#dc3b5d',
        colorWarning: '#ffba18',
        colorSuccess: '#b0e64c',
        colorBorder: '#bbb',
        colorBorderSecondary: '#cecece',
        borderRadius: 2,
        wireframe: false,
      },
      components: {
        Input: {
          activeShadow: 'none',
          errorActiveShadow: 'none',
          warningActiveShadow: 'none',
        },
        InputNumber: {
          activeShadow: 'none',
          errorActiveShadow: 'none',
          warningActiveShadow: 'none',
        },
      },
      algorithm: ATheme.compactAlgorithm,
      hashed: false,
    },
    theme,
  )

  return (
    <AConfigProvider prefixCls="cg" size={size} theme={themeConfig}>
      {children}
    </AConfigProvider>
  )
}

ConfigProvider.propTypes = {
  /**
   * 设置主题code
   */
  theme: propTypes.object,

  /**
   * 设置组件的尺寸
   */
  size: propTypes.oneOf(['small', 'middle', 'large']),
}

export default ConfigProvider
