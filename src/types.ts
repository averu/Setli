export interface Song {
  id: number
  title: string
  artist: string
}

export type Settings = {
  sceneName: string
  textName: string
  fontFamily: string
  fontColor: string
  outline: boolean
  outlineWidth: number
  outlineColor: string
  lineBreaks: number
}
