import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'
import { useMount, useUnmount } from 'remote:glide_components/hooks'
import { classNames } from 'remote:glide_components/utils'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import styles from './Editor.module.less'

const Editor = forwardRef(function ({ style, className, language, value, onChange }, ref) {
  const ready = useRef(false)
  const el = useRef(null)
  const editor = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      getEditor() {
        return editor.current
      },
    }
  })

  useMount(() => {
    editor.current = monaco.editor.create(el.current, {
      value,
      language,
      theme: 'vs-dark',
      formatOnType: true,
      formatOnPaste: true,
      tabSize: 2,
      automaticLayout: true,
      scrollBeyondLastLine: true,
    })

    setTimeout(() => {
      editor.current.trigger('format', 'editor.action.formatDocument')
      editor.current.setValue(editor.current.getValue())

      editor.current.onDidChangeModelContent(() => {
        if (!ready.current) {
          ready.current = true
          return
        }
        onChange(editor.current.getValue())
      })
    }, 0)
  })

  useUnmount(() => {
    editor.current.dispose()
  })

  return <div style={style} ref={el} className={classNames(styles.editor, { [className]: className })} />
})

Editor.defaultProps = {
  language: 'javascript',
  onChange: () => {},
}

Editor.propTypes = {
  /**
   * 指定样式
   */
  style: propTypes.object,
  className: propTypes.string,
  language: propTypes.oneOf(['javascript', 'json']),
  value: propTypes.string,
}

export default Editor
