import React from 'react'
import { ConfigProvider as AConfigProvider, theme as ATheme } from 'antd'

function ConfigProvider({ theme, children, ...props }) {
  const themeConfig = {
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
    algorithm: ATheme.compactAlgorithm,
    hashed: false,
    ...theme,
  }

  return (
    <AConfigProvider {...props} theme={themeConfig}>
      {children}
    </AConfigProvider>
  )
}

export default ConfigProvider
