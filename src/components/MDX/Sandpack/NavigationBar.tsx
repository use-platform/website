import React, { VFC } from 'react'
import { FileTabs, UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react'

import { Refresh, Codesandbox } from '../../icons'
import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  onReset: () => void
}

export const NavigationBar: VFC<NavigationBarProps> = (props) => {
  const { onReset } = props

  return (
    <div className={styles.Container}>
      <div className={styles.Tabs}>
        <FileTabs />
      </div>
      <div className={styles.Actions}>
        <button className={styles.ActionButton} onClick={onReset}>
          <Refresh />
          Reset
        </button>
        <UnstyledOpenInCodeSandboxButton className={styles.ActionButton}>
          <Codesandbox />
          CodeSandbox
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  )
}
