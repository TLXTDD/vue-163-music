<template>
  <div class="BottomBarPlay" @click="handleGoToPlayPage">
    <div class="songInfo">
      <div class="picUrl">
        <van-image
          round
          fit="cover"
          width="100%"
          height="100%"
          lazy-load
          :src="authorPic"
        />
      </div>
      <div class="song">
        <p class="name">{{ name }}</p>
        <p class="author">{{ author }} - {{ name }}</p>
      </div>
    </div>

    <audio
      :src="playUrl"
      ref="audioEle"
      @timeupdate="handleTimeupdate"
      @ended="handleEnded"
      @play="handlePlay"
    ></audio>

    <div class="control_btn">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :size="size"
        :color="gradientColor"
        layer-color="#aaa"
        :speed="speed"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import MusicUtils from '../../common/MusicUtils'
import { Toast } from 'vant'
export default {
  name: 'BottomBarPlay',
  props: {
    isShowBottomBarPlayBtn: {
      type: Boolean,
      require: true
    },
    rate: {
      type: Number,
      require: true
    }
  },
  created () {
    this.handleSetSize()
    window.addEventListener('resize', this.handleSetSize)
    const storage = MusicUtils.getLocalStorageSongPlayList()
    this.playUrl = storage.length ? storage[0].url : ''
  },
  mounted () {
    const audio = this.$refs.audioEle
    const oldThis = this
    this.audio = audio
    this.setAudioEle(audio)
    window.setInterval(function () {
      const storage = MusicUtils.getLocalStorageSongPlayList()
      if (storage.length) {
        oldThis.name = storage[0].name
        oldThis.author = storage[0].author
        oldThis.authorPic = storage[0].pic
      }
    }, 3000)
  },
  computed: {
    ...mapState([
      'songLyric',
      'currentTime',
      'duration',
      'audioEle',
      'isShowLyric',
      'isPlayingState',
      'modeNum',
      'modeIcon',
      'modeAliIcon',
      'currentPlaySongIndex',
      'playerlist'
    ]),
    ...mapGetters(['getSongLyric'])
  },
  methods: {
    ...mapMutations([
      'setAudioEle',
      'setCurrentTime',
      'pauseSong',
      'playSong',
      'setVolume',
      'setDuration',
      'setIsShowLyric',
      'setIsPlayingState',
      'setModeNum',
      'setModeIcon',
      'setCurrentPlaySongIndex'
    ]),
    ...mapActions(['getMusicUrl', 'getMusicLyric']),
    handleTimeupdate (e) {
      // this.setCurrentTime(MusicUtils.timeFormat(e.target.currentTime))
      this.setCurrentTime(e.target.currentTime)
    },
    handlePlay (e) {
      Toast('开始播放')
      // 注意 开始播放后 获取总时间
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (!isNaN(e.target.duration)) {
          clearInterval(this.timer)
        }
        this.setDuration(e.target.duration)
      }, 500)
    },
    handleEnded () {
      Toast('播放结束啦！！')
      // 0 单曲循环
      // 1 随机播放
      // 2 顺序播放
      switch (this.modeNum) {
        case 0:
          this.handlePrevNextOperation(0)
          break
        case 1:
          this.handlePrevNextOperation(this.playerlist.length * Math.random() | 0)
          break
        case 2:
          this.handlePrevNextOperation(1)
          break
      }
    },
    handleSetSize () {
      const html = document.querySelector('html')
      const width = html.getBoundingClientRect().width
      const size = 48 * width / 750
      this.size = size + 'px'
    },
    handleGoToPlayPage () {
      this.$router.push('/play')
    },
    async handlePrevNextOperation (n) {
      // console.log('下一曲')
      // console.log(this.playerlist)
      // console.log(this.currentPlaySongIndex)
      const currentIndex = MusicUtils.getLocalStorageSongPlayList('currentPlaySongIndex') || this.currentPlaySongIndex
      const playerlist = MusicUtils.getLocalStorageSongPlayList('playerlist') || this.playerlist
      const index = (currentIndex + n) % playerlist.length
      await this.setCurrentPlaySongIndex(index)
      const { id, name, ar, artists, al, album } = playerlist[index]
      // al picUrl

      const r = await this.getMusicUrl({
        id,
        name,
        author: ar ? ar[0].name : artists[0].name,
        pic: al ? al.picUrl : album.artist.img1v1Url
      })

      if (!r) {
        Toast('此歌曲无版权，无法播放')
        this.setCurrentPlaySongIndex((index + n) % playerlist.length)
        this.handlePrevNextOperation(playerlist.length * Math.random() | 0)
        return
      }
      await this.getMusicLyric(id)
      await this.setVolume()
      await this.playSong()
      this.handleEnterOperation()

      const storage = MusicUtils.getLocalStorageSongPlayList('historyPlayList')
      storage.push(name)
      MusicUtils.setLocalStorageSongPlayList(storage, 'historyPlayList')
    },
    handleEnterOperation () {
      const { name, author, pic, songLyric } = MusicUtils.getLocalStorageSongPlayList()[0]
      // songLyric 当在播放页面刷新后 也能播放
      this.handleLyricStr(this.getSongLyric || songLyric)
      this.name = name
      this.author = author
      this.pic = pic
    },
    handleLyricStr (lyric) {
      const lrcArr = lyric.split('[')
      // console.log(lrcArr)
      const songLyricList = []
      for (let i = 0; i < lrcArr.length; i++) {
        const arr = lrcArr[i].split(']')
        const text = arr[1]

        const time = arr[0].split('.')
        const timer = time[0].split(':')
        const ms = timer[0] * 60 + timer[1] * 1
        // console.log(ms)
        if (text && !isNaN(ms)) {
          songLyricList.push({ text, ms })
        }
      }
      this.songLyricList = songLyricList
      // console.log(songLyricList)
    }
  },
  data () {
    return {
      // 当rate发生变化时，v-model会以speed的速度变化，直至达到rate设定的值。
      //  当前进度
      audio: null,
      currentRate: 0,
      speed: 1,
      // rate/s
      // 目标进度
      // rate: 100, // 每首歌的总时间(s)

      size: '24px',
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      playUrl: '',
      timer: null,
      author: '',
      name: '请播放歌曲',
      authorPic: 'https://img01.yzcdn.cn/vant/cat.jpeg'
    }
  }
}
</script>

<style lang="less" scoped>
.BottomBarPlay{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 90px;
  background: #fff;
  box-shadow: 0 -1px 1px rgba(0,0,0,0.3);
  justify-content: space-between;
  align-items: center;
  .songInfo{
    display: flex;
    margin-left: 20px;
    .picUrl{
      width: 72px;
      height: 72px;
      margin-right: 12px;
    }
    .song{
      font-size: 24px;
      .name{}
      .author{
        font-size: 14px;
        color: #666;
      }
    }
  }

  .control_btn{
    position: relative;
    margin-right: 20px;
  }
}
</style>
