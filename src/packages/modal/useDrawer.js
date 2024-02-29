import React from 'react'
import { Button } from 'remote:glide_components/Base'

import st from './Drawer.module.less'

export default function useDrawer({
  style,
  className,
  title,
  visible,
  size,
  placement,
  zIndex,
  classNames,
  styles,
  showCancel,
  cancelText,
  showConfirm,
  confirmText,
  action,
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

  function handleClose() {
    onCancel()
    onHide()
  }

  function renderFooter() {
    if (!showCancel && !showConfirm) {
      return null
    }

    return (
      <div className={st.footer}>
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
      className,
      title,
      placement,
      open: visible,
      zIndex,
      classNames,
      styles,
      rootStyle: getContainer ? { position: 'absolute' } : undefined,
      closeIcon: closeable,
      destroyOnClose: destroyInactive,
      footer: renderFooter(),
      getContainer,
      mask,
      push: false,
      maskClosable,
      width: ['left', 'right'].includes(placement) ? size : undefined,
      height: ['top', 'bottom'].includes(placement) ? size : undefined,
      extra: action,
      onCancel,
      onOk: onConfirm,
      afterOpenChange: handleAfterOpenChange,
      onClose: handleClose,
    },
  }
}
