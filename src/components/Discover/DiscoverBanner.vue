<template>
  <div class="discover-banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item,index) in discoverBanner"
        :key="index"
        @click="handlePreview(index)"
      >
        <img v-lazy="item.pic" width="100%" height="100%"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from '../../common/api'
import { ImagePreview } from 'vant'
export default {
  name: 'DiscoverBanner',
  data () {
    return {
      discoverBanner: [],
      previewList: []
    }
  },
  props: ['urlApi'],
  async created () {
    const banner = await getBanner(this.urlApi)
    const discoverBanner = banner.data.banners || banner.data.data
    this.discoverBanner = discoverBanner
    const previewList = discoverBanner.map((item) => {
      return item.pic
    })
    this.previewList = previewList
  },
  methods: {
    handlePreview (i) {
      const self = this
      ImagePreview({
        images: self.previewList,
        startPosition: i,
        onClose ({ index }) {
          if (self.discoverBanner[index].url) {
            window.location.href = self.discoverBanner[index].url
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .discover-banner{
    padding: 0 28px;
    height: 260px;
    .my-swipe{
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
    }
  }
</style>
