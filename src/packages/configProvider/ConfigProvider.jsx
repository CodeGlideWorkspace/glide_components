import React from 'react'
import { ConfigProvider as AConfigProvider, theme } from 'antd'

function ConfigProvider({ children }) {
  const themeConfig = {
    token: {
      colorPrimary: '#26997b',
      colorInfo: '#26997b',
      colorError: '#dc3b5d',
      colorWarning: '#ffba18',
      colorSuccess: '#b0e64c',
      borderRadius: 2,
      wireframe: false,
    },
    algorithm: theme.darkAlgorithm,
  }

  return <AConfigProvider theme={themeConfig}>{children}</AConfigProvider>
}

export default ConfigProvider
