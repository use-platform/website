import React, { FC, ReactElement, Children, useState } from 'react'
import { SandpackProvider, SandpackFile } from '@codesandbox/sandpack-react'

import { SandpackView } from './SandpackView'
import styles from './Sandpack.module.css'

export const Sandpack: FC = (props) => {
  const { children } = props
  const [resetKey, setResetKey] = useState(0)
  const codeSnippets = Children.toArray(children) as ReactElement[]

  const files = codeSnippets.reduce(
    (result: Record<string, SandpackFile>, codeSnippet: ReactElement) => {
      if (codeSnippet.props.mdxType !== 'pre') {
        return result
      }
      const { props } = codeSnippet.props.children
      let filePath: string // path in the folder structure
      let fileHidden = false // if the file is available as a tab
      let fileActive = false // if the file tab is shown by default

      if (props.metastring) {
        const [name, ...params] = props.metastring.split(' ')
        filePath = '/' + name
        if (params.includes('hidden')) {
          fileHidden = true
        }
        if (params.includes('active')) {
          fileActive = true
        }
      } else {
        if (props.className === 'language-tsx') {
          filePath = '/App.js'
        } else if (props.className === 'language-css') {
          filePath = '/styles.css'
        } else {
          throw new Error(`Code block is missing a extenstion: ${props.children}`)
        }
      }
      if (result[filePath]) {
        throw new Error(
          `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`,
        )
      }
      result[filePath] = {
        code: props.children as string,
        hidden: fileHidden,
        active: fileActive,
      }

      return result
    },
    {},
  )

  files['/global.css'] = {
    code: sandboxStyle,
    hidden: true,
  }

  files['/styles.css'] = {
    code: [files['/styles.css']?.code ?? ''].join('\n\n'),
  }

  return (
    <div className={styles.Container}>
      <SandpackProvider key={resetKey} template="react" customSetup={{ files, dependencies }}>
        <SandpackView
          onReset={() => {
            setResetKey(resetKey + 1)
          }}
        />
      </SandpackProvider>
    </div>
  )
}

const sandboxStyle = `
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
`.trim()

const dependencies = { 'web-platform-alpha': 'latest', tslib: 'latest' }
