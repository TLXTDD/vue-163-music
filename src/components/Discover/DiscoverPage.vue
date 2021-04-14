<template>
  <div class="DiscoverPage">
    <DiscoverBanner urlApi="/banner?type=1"/>
    <DiscoverCate />
    <DiscoverSongSheet />

    <div class="Discover-Recommend">
      <p class="title-cate">每日推荐歌单</p>
      <div class="songSheet">
        <div
          class="songItem"
          v-for="(item,index) in songList"
          :key="index"
          :id="item.id"
          @click="handleClick(item.id, item.name)"
        >
          <div class="songInfo">
            <img width="100%" :src="item.coverImgUrl" alt="">
            <p class="info">
              <span class="num">
                <i class="iconfont icon icon-bofang"></i>
                {{item.playCount | handleNumberFormat}}
              </span>
            </p>
          </div>
          <p class="songTitle">
            {{item.name}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscoverBanner from './DiscoverBanner'
import DiscoverCate from './DiscoverCate'
import DiscoverSongSheet from './DiscoverSongSheet'
// 计算数量单位换算
import myMixins from '../../common/FilterMixins'

import { getRecommendSongSheet } from '../../common/api'

export default {
  name: 'DiscoverPage',
  mixins: [myMixins],
  data () {
    return {
      songList: []
    }
  },
  components: {
    DiscoverBanner,
    DiscoverCate,
    DiscoverSongSheet
  },
  async created () {
    const songList = await getRecommendSongSheet()
    this.songList = songList.data.playlists
  },
  methods: {
    handleClick (id, name) {
      this.$router.push({
        path: '/recommend',
        query: { id, name }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Discover-Recommend{
  .title-cate{
    font-size: 30px;
    font-weight: bold;
    padding-left: 30px;
  }
}
.songSheet{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 10px 0;

  .songItem{
    width: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;

    .songInfo{
      width: 210px;
      height: 210px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;

      .info{
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        font-size: 20px;

        i{
          font-size: 10px;
        }

        .num{
          color: white;
          margin: 8px 8px 8px 0;
        }
      }
    }

    .songSheet{

    }

    .songTitle{
      flex: 1;
      font-size: 20px;
      padding-top: 5px;
      line-height: 1.6;
      color: #393939;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow : hidden;
      text-overflow: ellipsis;

    }
  }
}
</style>
