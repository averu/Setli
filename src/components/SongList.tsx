import React, { useState } from 'react'
import { useSongs } from '../hooks/useSongs'
import styles from './SongList.module.css'
import type { Song } from '../types'
import Delete from '../assets/x-mark.svg'
import Plus from '../assets/plus.svg'

const SongList: React.FC = (props) => {
  const { songs, addSong, deleteSong } = useSongs()
  const [newSong, setNewSong] = useState('')

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newSong.trim()) {
      await addSong(newSong)
      setNewSong('')
    }
  }

  return (
    <div className={styles.songList}>
      <form onSubmit={handleAddSong}>
        <input type='text' name='song' value={newSong} onChange={(e) => setNewSong(e.target.value)} />
        <button type='submit'>
          <img src={Plus} />
        </button>
      </form>
      <ul>
        {songs.map((song: Song, index: number) => (
          <li key={index}>
            <span>{song.title}</span>
            <button onClick={() => deleteSong(index)}>
              <img src={Delete} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SongList
