<template>
  <div class="BottomBarPlay" >
    <div class="songInfo">
      <div class="picUrl">
        <van-image
          round
          fit="cover"
          width="100%"
          height="100%"
          lazy-load
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="song">
        <p class="name">追梦人</p>
        <p class="author">凤飞飞 - 浮世情怀</p>
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
import { mapState, mapMutations } from 'vuex'
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
    // console.log( storage )
    this.playUrl = storage.length ? storage[0].url : ''
  },
  mounted () {
    const audio = this.$refs.audioEle
    this.audio = audio
    this.setAudioEle(audio)
  },
  computed: {
    ...mapState(['audioEle'])
  },
  methods: {
    ...mapMutations(['setAudioEle', 'setCurrentTime', 'setDuration']),
    handleTimeupdate (e) {
      // this.setCurrentTime(MusicUtils.timeFormat(e.target.currentTime))
      this.setCurrentTime(e.target.currentTime)
    },
    handlePlay (e) {
      Toast('开始播放')
      // 注意 开始播放后 获取总时间
      setTimeout(() => {
        this.setDuration(e.target.duration)
      }, 100)
    },
    handleEnded () {
      Toast('播放结束啦！！')
    },
    handleSetSize () {
      const html = document.querySelector('html')
      const width = html.getBoundingClientRect().width
      const size = 48 * width / 750
      this.size = size + 'px'
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
      playUrl: ''
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
