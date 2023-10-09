import React, { useState, useEffect } from 'react'
import styles from './OBSConnection.module.css'
import Icon from '../assets/icon.png'

interface Props {
  onConnect: (host: string, port: number, password: string) => void
}

const LOCAL_STORAGE_KEYS = {
  HOST: 'host',
  PORT: 'port',
  PASSWORD: 'password',
}

const OBSConnection: React.FC<Props> = ({ onConnect }) => {
  const storedHost = localStorage.getItem(LOCAL_STORAGE_KEYS.HOST) || ''
  const storedPort = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.PORT)) || 4455
  const storedPassword = localStorage.getItem(LOCAL_STORAGE_KEYS.PASSWORD) || ''

  const [host, setHost] = useState<string>(storedHost)
  const [port, setPort] = useState<number>(storedPort)
  const [password, setPassword] = useState<string>(storedPassword)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HOST, host)
    localStorage.setItem(LOCAL_STORAGE_KEYS.PORT, String(port))
    localStorage.setItem(LOCAL_STORAGE_KEYS.PASSWORD, password)
  }, [host, port, password])

  const handleStringInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value)
  }

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value)
  }

  const handleConnect = () => {
    onConnect(host, port, password)
  }

  return (
    <div className={styles.obsConnection}>
      <div className={styles.icon}>
        <img src={Icon} alt='OBS Icon' />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Host:</label>
        <div className={styles.inputContainer}>
          <input
            value={host}
            onChange={(e) => handleStringInputChange(setHost, e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Port:</label>
        <div className={styles.inputContainer}>
          <input
            value={port}
            onChange={(e) => handleNumberInputChange(setPort, Number(e.target.value))}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Password:</label>
        <div className={styles.inputContainer}>
          <input
            type='password'
            value={password}
            onChange={(e) => handleStringInputChange(setPassword, e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.connectButton}>
        <button onClick={handleConnect}>Connect</button>
      </div>
    </div>
  )
}

export default OBSConnection
