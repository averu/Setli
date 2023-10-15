import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api'
import type { Song } from '../types'
import { withOBSHandling } from '../utils/errorHandler' // ここでエラーハンドリングユーティリティをインポートします。

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    getSongs()
  }, [])

  async function getSongs() {
    const result = await withOBSHandling(invoke<Song[]>('get_songs'), 'Error fetching songs')
    if (result) {
      setSongs(result)
    }
  }

  async function addSong(song: string) {
    const result = await withOBSHandling(invoke('add_song', { song }), 'Error adding song')
    if (!result) {
      await getSongs()
    }
  }

  async function deleteSong(index: number) {
    const result = await withOBSHandling(invoke('delete_song', { index }), 'Error deleting song')
    if (!result) {
      await getSongs()
    }
  }

  return { songs, addSong, deleteSong }
}

export default useSongs
