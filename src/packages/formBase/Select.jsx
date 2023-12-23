import React, { forwardRef } from 'react'
import propTypes from 'prop-types'
import { Select as ASelect } from 'antd'

import useSelect from './useSelect'

import './Select.module.less'

const Select = forwardRef(function (props, ref) {
  const { props: aProps, ref: aRef } = useSelect(props, ref)
  return <ASelect ref={aRef} {...aProps} />
})

Select.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,

  className: propTypes.string,

  /**
   * 是否允许清空
   */
  clearable: propTypes.bool,

  /**
   * 当选择了选项，自动清理搜索内容
   */
  autoClearSearchValue: propTypes.bool,

  /**
   * 自动获取焦点
   */
  autoFocus: propTypes.bool,

  /**
   * 是否有边框
   */
  bordered: propTypes.bool,

  /**
   * 值
   */
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),

  /**
   * 默认值
   */
  defaultValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  ]),

  /**
   * 是否禁用
   */
  disabled: propTypes.bool,

  /**
   * 是否多选
   */
  multiple: propTypes.bool,

  /**
   * 不存在时可新增
   */
  creatable: propTypes.bool,

  /**
   * 下拉菜单的开头插入元素
   */
  prefix: propTypes.element,

  /**
   * 下拉菜单的尾部插入元素
   */
  suffix: propTypes.element,

  /**
   * 自定义选项过滤方法
   * (text, option) => boolean
   */
  filter: propTypes.func,

  /**
   * 最大显示tag的数量
   */
  maxTagCount: propTypes.number,

  /**
   * 隐藏tag时的显示内容
   */
  maxTagPlaceholder: propTypes.string,

  /**
   * tag的最大文字长度
   */
  maxTagTextLength: propTypes.number,

  /**
   * 下拉框选项
   */
  data: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.shape({
        title: propTypes.string,
        children: propTypes.arrayOf(
          propTypes.shape({
            label: propTypes.string,
            value: propTypes.oneOfType([propTypes.string, propTypes.number]),
          }),
        ),
      }),
      propTypes.shape({
        label: propTypes.string,
        value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      }),
    ]),
  ),

  /**
   * 对于value无法在option中匹配到的场景下，设置labelInValue后，value的格式为{ value: value, label: label }
   */
  labelInValue: propTypes.bool,

  /**
   * 自定义选项渲染逻辑
   * (option) => ReactNode
   */
  optionRender: propTypes.func,

  /**
   * 加载中
   */
  loading: propTypes.bool,

  /**
   * 占位符
   */
  placeholder: propTypes.string,

  /**
   * 是否可搜索
   */
  searchable: propTypes.bool,

  /**
   * 设置自动分词
   */
  separators: propTypes.arrayOf(propTypes.string),

  /**
   * 开启虚拟滚动
   */
  virtual: propTypes.bool,

  /**
   * 值改变回调
   * (value, option) => void
   */
  onChange: propTypes.func,

  /**
   * 搜索改变时回调函数
   * (text) => void
   */
  onSearch: propTypes.func,
}

export default Select
