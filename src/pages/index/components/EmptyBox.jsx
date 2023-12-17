import React from 'react'
function EmptyBox({ text }) {
  return <div style={{ minHeight: '100px' }}>{text || '请拖入组件'}</div>
}

export default EmptyBox
