<template>
  <div class="DiscoverCate">
    <div
      class="gridview"
      v-for="(item) in cate"
      :key="item.id"
      @click='handleSwitchToPage(item.path)'
    >
      <div class="icon">
        <i :class="['iconfont',item.icon]"></i>
       </div>
      <div class="title" v-text="item.name"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscoverCate',
  methods: {
    handleSwitchToPage (path) {
      this.$router.push(path)
    }
  },
  data () {
    return {
      cate: [
        {
          id: 1,
          name: '每日推荐',
          icon: 'icon-tuijian',
          path: '/recommend'
        },
        {
          id: 2,
          name: '歌单',
          icon: 'icon-gedan',
          path: '/songsheet'
        },
        {
          id: 3,
          name: '排行榜',
          icon: 'icon-paixingbang',
          path: '/rank'
        },
        {
          id: 4,
          name: '电台',
          icon: 'icon-FM_weixuanze',
          path: '/dj'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .DiscoverCate{
    display: flex;
    height: 146px;
    margin-top: 20px;
    padding: 0 28px;
    font-size: 20px;
    .gridview{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .icon{
        width: 85px;
        height: 85px;
        border-radius: 50%;
        background: linear-gradient(to left,#ff5e4d,#e62626);
        display: inherit;
        i{
          margin: auto;
          font-size: 55px;
          color: #fff;
        }
      }
    }
  }
</style>
