//
export function zero (num) {
  if (num < 10) return '0' + num
  else return '' + num
}
export function bodyScroll (event) {
  event.preventDefault()
}
export default {
  getLocalStorageSongPlayList (playlist = 'playlist') {
    const str = JSON.parse(window.localStorage.getItem(playlist))
    return str === 0 ? '0' : str || []
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
  },
  scrControl (t) {
    if (t === 0) { // 禁止滚动
      document.body.addEventListener('touchmove', bodyScroll, { passive: false })
    } else if (t === 1) { // 开启滚动
      document.body.removeEventListener('touchmove', bodyScroll, { passive: false })
    }
  }
}
