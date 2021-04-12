<template>
  <div class="Recommend">
    <van-sticky>
      <van-nav-bar
        :left-text="name"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
      />
      <div class="playAll">
        <i class="iconfont icon-play"></i>
        <span>播放全部</span>
      </div>
    </van-sticky>
    <SongPlayList :songLists="songLists"/>
  </div>
</template>

<script>
import { getToDayRecommend } from '../../common/api'
import SongPlayList from './SongPlayList'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Recommend',
  data () {
    return {
      songLists: [],
      name: '每日推荐'
    }
  },
  components: {
    SongPlayList
  },
  async created () {
    try {
      const { id, name } = this.$route.query
      if (name) this.name = name
      if (id) {
        await this.getSongsPlayList(id)
        this.songLists = this.getPlaylist
      } else {
        const songLists = await getToDayRecommend()
        this.songLists = songLists.data.data.dailySongs
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['getSongsPlayList']),
    onClickLeft () {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters(['getPlaylist'])
  }
}
</script>

<style lang="less" scoped>
  .Recommend > div .van-nav-bar{
    background-color: transparent !important;
  }
  .playAll{
    display: flex;
    height: 80px;
    background-color: #fff;
    font-size: 28px;
    color: #333;
    border-radius: 40px 40px 0 0;
    overflow: hidden;
    align-items: center;
    i{
      margin: 0 20px;
      font-size: 40px;
    }
  }
</style>
