<template>
  <div class="DjPage">
    <van-sticky>
      <van-nav-bar
        left-text="电台"
        left-arrow
        :border="false"
        @click-left="onClickLeft"
      />
    </van-sticky>

    <Banner urlApi="/dj/banner"/>

    <SongSheetCategory/>
    <div class="dj-list">
      <div
          v-for="(item,index) in djTopLists"
          :key="index"
          @click="handleGoToPlayPage(item.id, item.rcmdtext || item.name, true)"
          class="dj-list-item"
      >
        <div class="dj-pic">
          <van-image
            width="100%"
            height="100%"
            lazy-load
            fit="cover"
            :src="item.picUrl"
          />
        </div>
        <div class="dj-list-info">
          <p class="dj-list-title">{{ item.rcmdtext || item.name }}</p>
          <div class="dj-list-user">
            <div class="dj-list-user-pic">
              <van-image
                round
                fit="cover"
                width="100%"
                height="100%"
                lazy-load
                :src="item.dj.avatarUrl"
              />
            </div>
            <div class="dj-list-user-name">
              {{ item.dj.nickname }}
            </div>
            <p>
              <i class="iconfont icon-redian"></i>
              {{ item.subCount }}
            </p>
          </div>
        </div>
        <i class="iconfont icon-bofang1 dj-play-btn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeDjTopList } from '../../common/api'
export default {
  name: 'DjPage',
  data () {
    return {
      djTopLists: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    handleGoToPlayPage (id, name, isDj) {
      this.$router.push({
        path: '/recommend',
        query: { id, name, isDj }
      })
    }
  },
  async created () {
    const djTopLists = await getHomeDjTopList()
    this.djTopLists = djTopLists.data.djRadios
  }
}
</script>

<style lang="less" scoped>
  .dj-list{
    .dj-list-item{
      display: flex;
      height: 118px;
      align-items: center;
      justify-content: space-evenly;

      .dj-pic{
        width: 96px;
        height: 96px;
        border-radius: 10px;
        overflow: hidden;
      }
      .dj-list-info{
        display: flex;
        width: 500px;
        height: 100%;
        color: #666;
        font-size: 26px;
        flex-direction: column;
        justify-content: space-evenly;
        .dj-list-title{
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dj-list-user{
          display: flex;
          font-size: 20px;
          .dj-list-user-pic{
            width: 30px;
            height: 30px;
            overflow: hidden;
          }
          .dj-list-user-name{
            margin: 0 13px;
          }
        }
      }
      .dj-play-btn{
        font-size: 46px;
      }
    }
  }
</style>
