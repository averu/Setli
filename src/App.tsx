import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import OBSConnection from './components/OBSConnection'
import SongList from './components/SongList'
import SettingsPanel from './components/SettingsPanel'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const [connected, setConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleConnect = async (host: string, port: number, password: string) => {
    try {
      const result: boolean = await invoke('connect_to_obs', {
        config: { host, port, password },
      })
      if (!result) {
        setErrorMessage('OBSとの接続に失敗しました。入力されたフィールドが正しいか確認してください。')
        return
      }
      // 接続が成功したら、曲のリストを取得して表示する処理を追加
      setConnected(result)
    } catch (error) {
      setErrorMessage('OBSとの接続時にエラーが発生しました。')
    }
  }

  return (
    <div className='App'>
      {!connected ? (
        <div className='connectContainer'>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <OBSConnection onConnect={handleConnect} />
        </div>
      ) : (
        <div className='settingsContainer'>
          <SongList />
          <SettingsPanel />
        </div>
      )}
    </div>
  )
}

export default App
