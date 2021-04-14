import Vue from 'vue'
import Vuex from 'vuex'

import { getMusicUrl, getMusicLyric, getHomeSongSheetsDetail, getHomeDjProgramList } from '../common/api'
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
    translateY: 0,
    playerList: [],
    isShowLyric: false,
    isPlayingState: false,
    isPlayPause: false,
    modeNum: 2,
    modeIcon: 'icon-xunhuan',
    modeAliIcon: [
      {
        icon: 'icon-danquxunhuan',
        name: '单曲循环'
      },
      {
        icon: 'icon-suiji',
        name: '随机播放'
      },
      {
        icon: 'icon-xunhuan',
        name: '循环播放'
      }
    ]
  },
  getters: {
    getPlaylist (state) {
      return state.playlist
    },
    getSongLyric (state) {
      return state.songLyric
    }
  },
  mutations: {
    setAudioEle (state, playLoad) {
      state.audioEle = playLoad
    },
    playSong (state) {
      state.audioEle.volume = 0.1
      // state.audioEle.playbackRate = 1.5
      state.isPlayingState = true
      state.isPlayPause = true
      // const res = MusicUtils.getLocalStorageSongPlayList()
      // state.audioEle.src = res[state.currentPlaySongIndex].url
      state.audioEle.play()
    },
    playbackRate (state, scale = 3) {
      state.audioEle.playbackRate = scale
    },
    pauseSong (state) {
      state.audioEle.pause()
      state.isPlayingState = false
      state.isPlayPause = false
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
    },
    setPlayerList (state, playLoad) {
      state.currentPlaySongIndex = playLoad.index
      state.playerlist = playLoad.list
      // 防止刷新
      MusicUtils.setLocalStorageSongPlayList(playLoad.list, 'playerlist')
      MusicUtils.setLocalStorageSongPlayList(playLoad.index, 'currentPlaySongIndex')
    },
    setIsShowLyric (state) {
      state.isShowLyric = !state.isShowLyric
    },
    setIsPlayingState (state) {
      state.isPlayingState = !state.isPlayingState
    },
    setModeNum (state, playLoad) {
      state.modeNum = playLoad
    },
    setModeIcon (state, playLoad) {
      state.modeIcon = state.modeAliIcon[playLoad].icon
    },
    setCurrentPlaySongIndex (state, payload) {
      state.currentPlaySongIndex = payload
      // 防止刷新
      MusicUtils.setLocalStorageSongPlayList(payload, 'currentPlaySongIndex')
    }
  },
  actions: {
    async getMusicUrl ({ commit, getters, state }, playLoad) {
      try {
        const { id, name, author, pic } = playLoad
        const res = await getMusicUrl(id)
        const data = res.data.data
        if (data.length && data[0].url) {
          state.audioEle.src = data[0].url
          data[0].name = name
          data[0].author = author
          data[0].pic = pic
          MusicUtils.setLocalStorageSongPlayList(data)
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log('请检查接口', e)
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
        const data = MusicUtils.getLocalStorageSongPlayList()
        data[0].songLyric = state.songLyric
        MusicUtils.setLocalStorageSongPlayList(data)
      } catch (e) {
        console.log('歌词获取失败')
      }
    },
    async getSongsPlayList ({ commit, state }, objs) {
      if (objs.isDj) {
        const res = await getHomeDjProgramList(objs.id)
        commit('setPlayList', res.data.programs)
      } else {
        const res = await getHomeSongSheetsDetail(objs.id)
        commit('setPlayList', res.data.playlist.tracks)
      }
    }
  },
  modules: {}
})
