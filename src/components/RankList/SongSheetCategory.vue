<template>
  <div class="song-sheet">
    <p class="title">榜单排行</p>
    <div class="song-sheet-list">
      <div
        class="song-sheet-cate"
        v-for="(item,index) in djCateList.radios"
        :key="index"
        @click="handleClick(item.id, item.rcmdText)"
      >
        <div class="song-pic">
          <van-image
            width="100%"
            height="100%"
            lazy-load
            fit="cover"
            :src="item.picUrl"
          />
          <span class="updateTime">{{ item.name }}</span>
        </div>
        <p class="song-sheet-name">{{ item.rcmdText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeDjRecommend } from '../../common/api'
export default {
  name: 'SongSheetCategory',
  data () {
    return {
      djCateList: []
    }
  },
  async created () {
    const djCateList = await getHomeDjRecommend()
    this.djCateList = djCateList.data.data[0]
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
.song-sheet {
  display: flex;
  height: 340px;
  padding: 0 30px;
  flex-direction: column;
  justify-content: space-evenly;

  .title {
    font-size: 32px;
    font-weight: bold;
  }

  .song-sheet-list {
    display: flex;
    justify-content: space-between;

    .song-sheet-cate {
      .song-pic {
        position: relative;
        width: 218px;
        height: 218px;
        border-radius: 15px;
        overflow: hidden;

        .updateTime {
          position: absolute;
          bottom: 13px;
          left: 10px;
          font-size: 16px;
          color: #fff;
          opacity: 0.9;
        }
      }

      .song-sheet-name {
        margin: 6px 0;
        font-size: 22px;
        color: #333;
      }
    }
  }
}
</style>
