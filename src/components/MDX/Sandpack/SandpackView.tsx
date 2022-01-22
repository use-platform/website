import React, { VFC, useRef, useState } from 'react'
import {
  useSandpack,
  useActiveCode,
  SandpackCodeEditor,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react'

import { ArrowShortBottom, ArrowShortTop } from '../../icons'
import { Preview } from './Preview'
import { NavigationBar } from './NavigationBar'
import { theme } from './theme'
import styles from './SandpackView.module.css'

interface SandpackViewProps {
  onReset: () => void
}

export const SandpackView: VFC<SandpackViewProps> = (props) => {
  const { onReset } = props
  const lineCountRef = useRef<Record<string, number>>({})
  const { sandpack } = useSandpack()
  const { code } = useActiveCode()
  const [isExpanded, setIsExpanded] = useState(false)

  const { activePath } = sandpack
  if (!lineCountRef.current[activePath]) {
    lineCountRef.current[activePath] = code.split('\n').length
  }
  const lineCount = lineCountRef.current[activePath]
  const isExpandable = lineCount > 16 || isExpanded
  const editorHeight = isExpandable ? lineCount * 24 + 24 + 16 : 'auto'
  const getHeight = () => {
    if (!isExpandable) {
      return editorHeight
    }
    return isExpanded ? editorHeight : 406
  }

  return (
    <SandpackThemeProvider theme={theme}>
      <NavigationBar onReset={onReset} />
      <div className={styles.Container} ref={sandpack.lazyAnchorRef} style={{ minHeight: 216 }}>
        <SandpackCodeEditor
          customStyle={{
            height: getHeight(),
            maxHeight: isExpanded ? '' : 406,
          }}
          showLineNumbers
        />
        <Preview
          isExpanded={isExpanded}
          customStyle={{
            height: getHeight(),
            maxHeight: isExpanded ? '' : 406,
          }}
        />
      </div>
      {isExpandable && (
        <button
          className={styles.ExpandButton}
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? <ArrowShortTop /> : <ArrowShortBottom />}
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </SandpackThemeProvider>
  )
}
