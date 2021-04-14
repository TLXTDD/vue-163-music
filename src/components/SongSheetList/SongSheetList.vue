<template>
  <div class="SongSheetList">
    <div class="songSheet">
      <div class="songItem"
           v-for="(item,index) in songSheetsLists"
           :key="index"
           @click="handleClick(item.id, item.name)"
      >
        <div class="songInfo">
          <van-image
            width="100%"
            height="100%"
            lazy-load
            fit="cover"
            :src="item.coverImgUrl"
          />
          <p class="info">
            <i class="iconfont icon icon-bofang"></i>
            <span class="num">{{item.playCount | handleNumberFormat}}</span>
          </p>
        </div>
        <p class="songTitle">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 计算数量单位换算
import myMixins from '../../common/FilterMixins'
import { getRecommendSongSheet } from '../../common/api'
export default {
  name: 'SongSheetList',
  mixins: [myMixins],
  data () {
    return {
      songSheetsLists: []
    }
  },
  props: ['id', 'name'],
  async created () {
    const SongSheetLists = await getRecommendSongSheet(this.name)
    this.songSheetsLists = SongSheetLists.data.playlists
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
.songSheet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 10px 0;

  .songItem {
    display: flex;
    width: 210px;
    height: 285px;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;

    .songInfo {
      position: relative;
      width: 210px;
      height: 210px;
      border-radius: 10px;
      overflow: hidden;

      .info {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        font-size: 20px;

        i{
          font-size: 10px;
        }
        .num {
          color: white;
          margin: 8px 8px 8px 0;
        }
      }
    }

    .songTitle {
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
