import React, { VFC } from 'react'

import styles from './Error.module.css'

interface ErrorType {
  title?: string
  message: string
}

interface ErrorProps {
  error: ErrorType
}

export const Error: VFC<ErrorProps> = (props) => {
  const { error } = props
  const { message, title } = error

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>{title || 'Error'}</h2>
      <pre className={styles.Text}>{message}</pre>
    </div>
  )
}
