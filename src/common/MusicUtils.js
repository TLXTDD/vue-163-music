//
export function zero (num) {
  if (num < 10) return '0' + num
  else return '' + num
}
export default {
  getLocalStorageSongPlayList (playlist = 'playlist') {
    return JSON.parse(window.localStorage.getItem(playlist)) || []
  },
  setLocalStorageSongPlayList (payload, playlist = 'playlist') {
    const data = JSON.stringify(payload)
    window.localStorage.setItem(playlist, data)
  },
  removeLocalStorageSongPlayList (data) {
    window.localStorage.removeItem(data)
  },
  timeFormat (t) {
    t = parseInt(t)
    // const h = zero(Math.floor(t % 3600))
    const m = zero(Math.floor(t % 3600 / 60))
    const s = zero(Math.floor(t % 60))
    return m + ':' + s
  }
}
