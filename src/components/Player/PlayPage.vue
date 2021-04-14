<template>
  <div class="PlayPage">
    <div class="play-nav-bar">
      <div class="leading">
        <i class="iconfont icon-fanhui" @click="handleBack"></i>
        <div class="song-info">
          <span class="song-name">{{ name }}</span>
          <span class="song-author">{{ author }}</span>
        </div>
      </div>
    </div>
    <div class="play-container" @click="handleToggleLyric">
      <!--圆盘-->
      <div class="play-disc">
        <div class="needle">
          <img :class="isPlayingState?'':'rotate'" width="100%" height="100%" src="../../assets/img/needle.png" alt="">
        </div>
        <div :class="['disc',isPlayingState? 'play-disc-rotate' : '']">
          <div class="play-song-cover">
            <van-image
              round
              width="100%"
              height="100%"
              fit="cover"
              :src="pic"
            />
          </div>
        </div>
      </div>
      <!--歌词-->
      <div v-if="isShowLyric" class="lyric-wrap">
        <ul
          :style="{transform:`translate3d(0,-${getLine}px,0)`}"
        >
          <li
            v-for="(item,index) in songLyricList"
            :key="index"
            :id="item.ms"
            :class="line === index?'active':''"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <!--控制面板-->
    <div class="play-controls">
      <div class="play-time">
        <span class="current-time">{{ currentTime | handleTimeFormat }}</span>
        <van-slider
          :value="currentTime"
          @change="onChange"
          button-size="12"
          active-color="#fff"
          inactive-color="#bbb"
          :max="duration"
        />
        <span class="duration-time">{{ duration | handleTimeFormat }}</span>
      </div>
      <div class="play-btn">
        <i :class="['iconfont', modeIcon]" @click="handlePlayMode"></i>
        <i :class="['iconfont','icon-shangyiqu']" @click="handlePrev"></i>
        <i :class="['iconfont','icon-zanting']" @click="handlePause" v-if="isPlayPause"></i>
        <i :class="['iconfont','icon-weibiaoti--']" @click="handlePlaySong" v-else-if="!isPlayPause"></i>
        <i :class="['iconfont','icon-xiayiqu']" @click="handleNext"></i>
        <i :class="['iconfont','icon-bofangliebiao']" @click="handleBottomSheet"></i>
      </div>
    </div>
    <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '70%'}"
        round
        class="bottompopup"
    >
      <BottomSheetPlayList></BottomSheetPlayList>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import MusicUtils from '../../common/MusicUtils'
import FilterMixins from '../../common/FilterMixins'
import { Toast } from 'vant'
import BottomSheetPlayList from './BottomSheetPlayList'

export default {
  name: 'PlayPage',
  mixins: [FilterMixins],
  data () {
    return {
      playList: [],
      songLyricList: [],
      line: 0,
      top: 0,
      name: '',
      author: '',
      show: false,
      pic: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  components: {
    BottomSheetPlayList
  },
  async created () {
    // const { id, name, author } = this.$route.query
    // this.name = name
    // this.author = author
    // const r = await this.getMusicUrl(id)
    // if (!r) {
    //   Toast('此歌曲无版权，无法播放')
    //   this.$router.back()
    //   return
    // }
    // await this.getMusicLyric(id)
    // if (this.songLyric !== '') {
    //   await this.handleLyricStr(this.songLyric)
    //   await this.setVolume()
    //   await this.playSong()
    // }
    this.handleEnterOperation()
  },
  beforeUpdate () {
    this.handleEnterOperation()
  },
  mounted () {
    // if (this.songLyric !== '') {
    //   this.handleLyricStr(this.songLyric)
    // }
  },
  methods: {
    ...mapMutations([
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
    handleEnterOperation () {
      const { name, author, pic, songLyric } = MusicUtils.getLocalStorageSongPlayList()[0]
      // songLyric 当在播放页面刷新后 也能播放
      if (this.getSongLyric || songLyric) {
        this.handleLyricStr(this.getSongLyric || songLyric)
      }
      this.name = name
      this.author = author
      this.pic = pic
    },
    async handlePrevNextOperation (n) {
      // console.log('下一曲')
      // console.log(this.playerlist)
      // console.log(this.currentPlaySongIndex)
      const currentIndex = MusicUtils.getLocalStorageSongPlayList('currentPlaySongIndex') || this.currentPlaySongIndex
      // console.log(typeof currentIndex)
      let playerlist = (this.playerlist.length && this.playerlist) || MusicUtils.getLocalStorageSongPlayList('playerlist')

      const index = (currentIndex + n < 0 ? playerlist.length - 1 : currentIndex + n) % playerlist.length
      // console.log(index)
      // console.log(playerlist)
      await this.setCurrentPlaySongIndex(index)
      playerlist = MusicUtils.getLocalStorageSongPlayList('playerlist') || this.playerlist
      const { id, name, ar, artists, al, album } = playerlist[(index)]
      // al picUrl

      const r = await this.getMusicUrl({
        id,
        name,
        author: ar ? ar[0].name : artists[0].name,
        pic: al ? al.picUrl : album.artist.img1v1Url
      })

      if (!r) {
        Toast('此歌曲无版权，无法播放')
        this.setCurrentPlaySongIndex(index)
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
    handlePrev () {
      Toast('上一曲')
      this.handlePrevNextOperation(-1)
    },
    async handleNext () {
      Toast('下一曲')
      this.handlePrevNextOperation(1)
    },
    handlePlayMode () {
      let index = this.modeNum
      index = index + 1
      index = index % 3
      this.setModeNum(index)
      this.setModeIcon(index)
      Toast(this.modeAliIcon[index].name)
    },
    handleToggleLyric () {
      this.setIsShowLyric()
    },
    handleLyricStr (lyric) {
      const lrcArr = lyric.split('[')
      const songLyricList = []
      for (let i = 0; i < lrcArr.length; i++) {
        const arr = lrcArr[i].split(']')
        const text = arr[1]
        const time = arr[0].split('.')
        const timer = time[0].split(':')
        const ms = timer[0] * 60 + timer[1] * 1
        // if (text && text.length !== 1 && ms) {
        if (text && !isNaN(ms)) {
          songLyricList.push({ text, ms })
        }
        // }
      }
      this.songLyricList = songLyricList
    },
    onChange (value) {
      this.audioEle.currentTime = value
    },
    handlePlaySong () {
      // this.btnPlaySong()
      this.playSong()
    },
    handlePause () {
      this.pauseSong()
    },
    handleBack () {
      this.$router.back()
    },
    handleBottomSheet () {
      this.show = !this.show
    }
  },
  watch: {
    currentTime (t) {
      t = parseInt(t)
      const index = this.songLyricList.findIndex(function (item) {
        return item.ms === t
      })
      if (index !== -1) {
        if (this.line !== index) {
          this.line = index
        }
      }
    }
  },
  computed: {
    ...mapState([
      'songLyric',
      'currentTime',
      'duration',
      'audioEle',
      'isShowLyric',
      'isPlayingState',
      'isPlayPause',
      'modeNum',
      'modeIcon',
      'modeAliIcon',
      'currentPlaySongIndex',
      'playerlist'
    ]),
    ...mapGetters(['getSongLyric']),
    getLine () {
      if (this.line > 5) {
        return (this.line - 5) * 29
      } else return 0
    }
  }
}
</script>

<style lang="less" scoped>
.PlayPage{
  position: relative;
  z-index: 1002;

  /deep/ .bottompopup{
    z-index: 3000;
    font-size: 12px;
    text-align: center;
  }
}
.needle{
  width: 273px;
  height: 402px;
  /*border: 1px yellow solid;*/
  position: absolute;
  z-index: 99;
  left: 50%;
  top: -100px;

  img{
    /*border: 1px slateblue solid;*/
    transform: scale(0.5);
    transition: 1s;
    transform-origin: 44px 37px;
  }

  img.rotate{
    transform: scale(0.5) rotate(-30deg);
  }
}
@keyframes myRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.play-disc-rotate {
  animation: myRotate 10s infinite linear;
}

.PlayPage {
  position: relative;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(142, 132, 133) 0%, rgb(230, 132, 110) 100%);
  flex-direction: column;

  .play-nav-bar {
    padding-left: 40px;

    .leading {
      display: flex;
      align-items: center;

      .icon-fanhui {
        color: #fff;
        font-size: 40px;
      }

      .song-info {
        display: flex;
        margin-left: 35px;
        padding: 20px 0;
        flex-direction: column;

        .song-name {
          color: #fff;
          font-size: 40px;
          margin-bottom: 8px;
        }

        .song-author {
          color: rgba(255, 255, 255, .4);
          font-size: 20px;
        }
      }
    }
  }

  .play-container {
    flex: 1;
    position: relative;

    .play-disc {
      position: absolute;
      top: calc((100% - 564px) / 2);
      left: calc((100% - 564px) / 2);
      display: flex;
      width: 564px;
      height: 564px;
      background-color: rgba(255, 255, 255, .1);
      border-radius: 50%;

      .disc {
        display: flex;
        width: 546px;
        height: 546px;
        background: url('../../assets/img/disc.png');
        background-size: cover;
        margin: auto;

        .play-song-cover {
          width: 370px;
          height: 370px;
          margin: auto;
        }
      }
    }

    .lyric-wrap {
      z-index: 1000;
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgb(142, 132, 133) 0%, rgb(230, 132, 110) 100%);
      font-size: 30px;
      color: rgba(255, 255, 255, .5);
      text-align: center;
      overflow: hidden;

      ul {
        li {
          height: 60px;
          line-height: 60px;

          &.active {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }

  .play-controls {
    display: flex;
    height: 220px;
    flex-direction: column;
    justify-content: space-around;

    .van-slider {
      margin: 0 20px;
    }

    .play-time {
      display: flex;
      padding: 15px 25px;
      color: #aaa;
      font-size: 20px;
      align-items: center;
    }

    .play-btn {
      display: flex;
      color: #fff;
      justify-content: space-around;
      align-items: center;

      i {
        font-size: 50px;
      }

      .icon-weibiaoti--,
      .icon-zanting {
        font-size: 65px;
      }
    }
  }
}
</style>
