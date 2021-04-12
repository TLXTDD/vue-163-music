<template>
  <div class="DiscoverSongSheet">

    <div class="songsheet">
      <p class="title">精品歌单</p>
      <p class="lookMore">查看更多</p>
    </div>

    <div class="song-swipe">
      <div
        class="songItem"
        v-for="(item,index) in songList"
        :key="index"
        :id="item.id"
        @click="handleClick(item.id, item.name)"
      >
        <div class="songInfo">
          <img width="100%" :src="item.picUrl" alt="">
          <p class="info">
            <i class="iconfont icon icon-bofang"></i>
            <span class="num" >{{item.playCount | handleNumberFormat}}</span>
          </p>
        </div>
        <p class="songTitle" v-text="item.name"></p>
      </div>
    </div>

  </div>
</template>

<script>
// 计算播放量单位换算
import myMixins from '../../common/FilterMixins'
import { getPersonalized } from '../../common/api'

export default {
  name: 'DiscoverSongSheet',
  mixins: [myMixins],
  data () {
    return {
      setWidth: 105,
      songList: []
    }
  },
  async created () {
    this.handleSetWidth()
    window.addEventListener('resize', this.handleSetWidth)

    const songList = await getPersonalized()
    this.songList = songList.data.result
  },
  methods: {
    handleSetWidth () {
      const html = document.querySelector('html')
      const width = html.getBoundingClientRect().width
      this.setWidth = 210 * width / 750
    },
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
.DiscoverSongSheet{
  margin: 20px 0;
}
.song-swipe{
  display: flex;
  overflow: auto;
}
/*隐藏滚动条*/
.song-swipe::-webkit-scrollbar {
  display: none;
}
.icon{
  color: #fff;
}

.songsheet{
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  .title{
    font-size: 31px;
    color: #000;
    font-weight: bold;
  }

  .lookMore{
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
  }
}

.van-swipe-item{
  margin-left: 18px;
}
.songItem{
  width: 210px;
  margin-left: 30px;
  /*height: 286px;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
</style>
