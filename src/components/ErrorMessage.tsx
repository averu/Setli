import React from 'react'
import styles from './ErrorMessage.module.css'

interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default ErrorMessage
