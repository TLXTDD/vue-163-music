<template>
  <div class="SongSheetPage">
    <van-sticky>
      <van-nav-bar
        left-text="歌单广场"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-tabs animated swipeable rendered>
      <van-tab v-for="(item,index) in songSheetsCate" :title="item.name" :key="index">
        <SongSheetList :id="item.id" :name="item.name" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSongSheetsCate } from '../../common/api'
import SongSheetList from './SongSheetList'
export default {
  name: 'SongSheetPage',
  data () {
    return {
      songSheetsCate: []
    }
  },
  components: {
    SongSheetList
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  async created () {
    const songSheets = await getSongSheetsCate()
    this.songSheetsCate = songSheets.data.tags
  }
}
</script>

<style lang="less" scoped>
.SongSheetPage > div .van-nav-bar {
  background-color: transparent !important;
}
</style>
