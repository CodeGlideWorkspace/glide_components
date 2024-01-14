import React from 'react'
import { Button } from 'remote:glide_components/Base'

import st from './Modal.module.less'

export default function useModal({
  style,
  className,
  title,
  visible,
  width,
  zIndex,
  classNames,
  styles,
  showCancel,
  cancelText,
  showConfirm,
  confirmText,
  action,
  centered,
  closeable,
  loading,
  destroyInactive,
  getContainer,
  mask,
  maskClosable,
  onCancel,
  onConfirm,
  onShow,
  onHide,
}) {
  function handleAfterOpenChange(visible) {
    if (visible) {
      onShow()
    } else {
      onHide()
    }
  }

  function renderFooter() {
    if (!action && !showCancel && !showConfirm) {
      return null
    }

    return (
      <div className={st.footer}>
        {action}
        {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}
        {showConfirm && (
          <Button type="primary" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        )}
      </div>
    )
  }

  return {
    props: {
      style,
      wrapClassName: className,
      title,
      open: visible,
      width,
      zIndex,
      classNames,
      styles,
      centered,
      closeIcon: closeable,
      destroyOnClose: destroyInactive,
      footer: renderFooter(),
      getContainer,
      mask,
      maskClosable,
      onCancel,
      onOk: onConfirm,
      afterOpenChange: handleAfterOpenChange,
    },
  }
}
