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
    <div class="play-container">
      <!--圆盘-->
      <div class="play-disc play-disc-rotate">
        <div class="disc">
          <div class="play-song-cover">
            <van-image
              round
              width="100%"
              height="100%"
              fit="cover"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
        </div>
      </div>
      <!--歌词-->
      <div v-if="true" class="lyric-wrap">
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
        <i :class="['iconfont','icon-danquxunhuan']"></i>
        <i :class="['iconfont','icon-xunhuan']"></i>
        <i :class="['iconfont','icon-shangyiqu']"></i>
        <i :class="['iconfont','icon-zanting']" @click="handlePause" v-if="pause"></i>
        <i :class="['iconfont','icon-weibiaoti--']" @click="handlePlaySong" v-else-if="!pause"></i>
        <i :class="['iconfont','icon-xiayiqu']"></i>
        <i :class="['iconfont','icon-bofangliebiao']"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
// import MusicUtils from '../../common/MusicUtils'
import FilterMixins from '../../common/FilterMixins'
import { Toast } from 'vant'

export default {
  name: 'PlayPage',
  mixins: [FilterMixins],
  data () {
    return {
      pause: true,
      playList: [],
      songLyricList: [],
      line: 0,
      top: 0,
      name: '',
      author: ''
    }
  },
  async created () {
    const { id, name, author } = this.$route.query
    this.name = name
    this.author = author
    const r = await this.getMusicUrl(id)
    if (!r) {
      Toast('此歌曲无版权，无法播放')
      this.$router.back()
      return
    }
    await this.getMusicLyric(id)
    if (this.songLyric !== '') {
      await this.handleLyricStr(this.songLyric)
      await this.setVolume()
      await this.playSong()
    }
  },
  mounted () {
    // if (this.songLyric !== '') {
    //   this.handleLyricStr(this.songLyric)
    // }
  },
  methods: {
    ...mapMutations(['pauseSong', 'playSong', 'setVolume', 'setDuration', 'btnPlaySong']),
    ...mapActions(['getMusicUrl', 'getMusicLyric']),
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
      this.btnPlaySong()
      this.pause = true
    },
    handlePause () {
      this.pauseSong()
      this.pause = false
    },
    handleBack () {
      this.$router.back()
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
    ...mapState(['songLyric', 'currentTime', 'duration', 'audioEle']),
    getLine () {
      if (this.line > 5) {
        return (this.line - 5) * 29
      } else return 0
    }
  }
}
</script>

<style lang="less" scoped>
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
  z-index: 999;
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
