<template>
  <div class="home">
    <HomeHeader :activeIndex="index"/>
    <van-swipe
      ref="swiperEle"
      class="my-swipe"
      @change="onChange"
      :initial-swipe="swipeIndex"
      :loop="false"
      :show-indicators="false"
    >
      <van-swipe-item>
        <UserPage />
      </van-swipe-item>
      <van-swipe-item>
        <DiscoverPage />
      </van-swipe-item>
      <van-swipe-item>
        <VideoPage />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Bus from '../common/Bus'
import HomeHeader from '../components/Header/HomeHeader'
import DiscoverPage from '../components/Discover/DiscoverPage'
import VideoPage from '../components/Video/VideoPage'
import UserPage from '../components/UserCenter/UserPage'
export default {
  name: 'Home',
  data () {
    return {
      swipeIndex: 1,
      index: 1,
      num: 1
    }
  },
  created () {
    Bus.$on('switchPage', data => {
      this.num = data
    })
  },
  components: {
    DiscoverPage,
    HomeHeader,
    VideoPage,
    UserPage
  },
  watch: {
    num (newV, oldV) {
      this.$refs.swiperEle.swipeTo(newV, {
        immediate: false
      })
    }
  },
  methods: {
    onChange (index) {
      this.index = index
    }
  }
}
</script>
