import React from 'react'
import propTypes from 'prop-types'
import { Modal as AModal } from 'antd'

import useModal from './useModal'

function Modal(props) {
  const { props: aProps } = useModal(props)

  return <AModal {...aProps}>{props.children}</AModal>
}

Modal.defaultProps = {
  showCancel: true,
  cancelText: '关闭',
  showConfirm: true,
  confirmText: '确认',
  maskClosable: false,
  onShow: () => {},
  onHide: () => {},
}

Modal.propTypes = {
  /**
   * 弹窗样式
   */
  style: propTypes.object,
  className: propTypes.string,

  /**
   * 标题
   */
  title: propTypes.oneOfType([propTypes.element, propTypes.string]),

  /**
   * 弹窗是否可见
   */
  visible: propTypes.bool,

  /**
   * 弹窗的宽度
   */
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),

  zIndex: propTypes.number,

  /**
   * 配置弹窗相关样式类
   */
  classNames: propTypes.exact({
    header: propTypes.string,
    body: propTypes.string,
    footer: propTypes.string,
    mask: propTypes.string,
    wrapper: propTypes.string,
  }),
  styles: propTypes.exact({
    header: propTypes.object,
    body: propTypes.object,
    footer: propTypes.object,
    mask: propTypes.object,
    wrapper: propTypes.object,
  }),

  showCancel: propTypes.bool,
  cancelText: propTypes.string,
  showConfirm: propTypes.bool,
  confirmText: propTypes.string,

  /**
   * 垂直居中展示
   */
  centered: propTypes.bool,

  /**
   * 是否显示关闭按钮
   */
  closeable: propTypes.bool,

  /**
   * 是否加载中
   */
  loading: propTypes.bool,

  /**
   * 隐藏时是否销毁
   */
  destroyInactive: propTypes.bool,

  /**
   * 设置挂载点
   */
  getContainer: propTypes.func,

  /**
   * 是否显示遮罩
   */
  mask: propTypes.bool,

  /**
   * 是否允许点击遮罩关闭
   */
  maskClosable: propTypes.bool,

  /**
   * 弹窗动作区
   */
  action: propTypes.element,

  /**
   * 取消按钮回调
   */
  onCancel: propTypes.func,

  /**
   * 确认按钮回调
   */
  onConfirm: propTypes.func,

  /**
   * 显示时回调
   */
  onShow: propTypes.func,

  /**
   * 隐藏时回调
   */
  onHide: propTypes.func,
}

export default Modal
