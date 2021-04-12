import Vue from 'vue'
import Vuex from 'vuex'

import { getMusicUrl, getMusicLyric, getHomeSongSheetsDetail } from '../common/api'
import MusicUtils from '../common/MusicUtils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    audioEle: null,
    // 播放歌曲 显示 底部 BottomBarPlayBtn
    isShowBottomBarPlayBtn: false,
    // 每首歌的总时间
    rate: 0,
    // 搜索 歌曲名 历史记录
    searchSongNameHistory: [],
    // 歌单id
    songlistId: null,
    // 本人id
    userId: '',
    // 用户名
    username: '',
    // 头像
    avatarUrl: '',
    // 是否登录
    isLogin: false,
    // 播放状态：播放，暂停
    playing: false,
    // 当前播放列表
    playlist: [],
    // 当前播放的 第几首歌曲
    currentPlaySongIndex: 0,
    // 正在播放的歌曲 id
    songingId: 0,
    // 正在播放的歌词
    songLyric: '',
    // 当前播放音乐时间戳
    currentTime: 0,
    duration: 0,
    translateY: 0
  },
  getters: {
    getPlaylist (state) {
      return state.playlist
    }
  },
  mutations: {
    setAudioEle (state, playLoad) {
      state.audioEle = playLoad
    },
    playSong (state) {
      state.audioEle.volume = 0.1
      state.audioEle.playbackRate = 1.5
      const res = MusicUtils.getLocalStorageSongPlayList()
      state.audioEle.src = res[state.currentPlaySongIndex].url
      state.audioEle.play()
    },
    playbackRate (state, scale = 3) {
      state.audioEle.playbackRate = scale
    },
    btnPlaySong (state) {
      state.audioEle.play()
    },
    pauseSong (state) {
      state.audioEle.pause()
    },
    setCurrentTime (state, playLoad) {
      state.currentTime = playLoad
    },
    setDuration (state, playLoad) {
      state.duration = playLoad
    },
    setVolume (state) {
      state.audioEle.volume = 0.1
    },
    setPlayList (state, playLoad) {
      state.playlist = playLoad
    },
    setHistoryPlayList (state, storage) {
      if (storage.length >= 8) {
        for (let i = 1; i <= storage.length - 8; i++) {
          storage.shift()
        }
      }
      MusicUtils.setLocalStorageSongPlayList(storage, 'historyPlayList')
    }
  },
  actions: {
    async getMusicUrl ({ commit, getters, state }, id) {
      try {
        const res = await getMusicUrl(id)
        const data = res.data.data
        if (data.length && data[state.currentPlaySongIndex].url) {
          MusicUtils.setLocalStorageSongPlayList(data)
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log('请检查接口')
      }
    },
    async getMusicLyric ({ commit, state }, id) {
      try {
        const res = await getMusicLyric(id)
        if (res.data.lrc) {
          state.songLyric = res.data.lrc.lyric
        } else {
          state.songLyric = '[00:00.000] 纯音乐 无歌词 '
        }
      } catch (e) {
        console.log('歌词获取失败')
      }
    },
    async getSongsPlayList ({ commit, state }, id) {
      const res = await getHomeSongSheetsDetail(id)
      commit('setPlayList', res.data.playlist.tracks)
    }
  },
  modules: {}
})
