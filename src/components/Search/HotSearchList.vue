<template>
  <div class="HotSearchList">
    <div class="chip-storage">
      <p class="storage">历史记录</p>
      <van-tag style="float: right" @click="handleCleanUp">清空记录
      </van-tag>
      <div>
        <van-tag
          v-for="(item, index) in storage"
          size="medium"
          :key="index"
          color="#f3f3f3"
          text-color="#515151"
          round
          type="primary"
          @click="handleClick(item)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>
    <p class="hot-search-cate">热搜榜</p>
    <ul>
      <li
        v-for="(item,index) in searchHotLists"
        :key="index"
        @click="handleGoToPlayPage(item.searchWord)"
      >
        <div class="hot-search-info">
          <span :class="['order',index<3?'active':'']">{{ index+1 }}</span>
          <div class="hot-song">
            <div class="hot-song-name" :class="index<3?'fontW':''">
              {{ item.searchWord }}
              <van-icon :name="item.iconUrl" />
            </div>
            <p class="hot-song-des">{{ item.content }}</p>
          </div>
        </div>
        <span class="hot-song-playCount">{{ item.score }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchHotDetail } from '../../common/api'
import MusicUtils from '../../common/MusicUtils'
import Bus from '../../common/Bus'
import { mapMutations } from 'vuex'
export default {
  name: 'HotSearchList',
  data () {
    return {
      searchHotLists: [],
      storage: []
    }
  },
  async created () {
    try {
      const searchHotLists = await getSearchHotDetail()
      this.searchHotLists = searchHotLists.data.data
      const storage = MusicUtils.getLocalStorageSongPlayList('historyPlayList')
      this.storage = storage
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapMutations(['setHistoryPlayList']),
    handleGoToPlayPage (name) {
      const storage = MusicUtils.getLocalStorageSongPlayList('historyPlayList')
      storage.push(name)
      this.setHistoryPlayList(storage)
      Bus.$emit('handleKeywords', name)
    },
    handleClick (name) {
      Bus.$emit('handleKeywords', name)
    },
    handleCleanUp () {
      MusicUtils.removeLocalStorageSongPlayList('historyPlayList')
      location.reload()
    }

  }
}
</script>

<style lang="less" scoped>
.HotSearchList{
  .chip-storage{
    margin: 20px 0 ;
    padding: 0 30px;
    .storage{
      font-size: 26px;
      font-weight: bold;
    }
    .van-tag--primary{
      margin-left: 15px;
    }
  }
  .hot-search-cate{
    font-size: 26px;
    font-weight: bold;
    padding-left: 30px;
  }
  ul {
    margin-top: 20px;
    padding: 0 30px;
    li{
      display: flex;
      margin-bottom: 30px;
      justify-content: space-between;
      align-items: center;
      .hot-search-info{
        display: flex;
        align-items: center;
        .order{
          font-size: 30px;
          font-weight: 600;
          color: #aaa;
          &.active{
            font-size: 35px;
            color: #ce4f51;
            font-weight: bold;
          }
        }
        .hot-song{
          margin-left: 30px;
          .hot-song-name{
            font-size: 34px;
            margin-bottom: 10px;
            &.fontW{
              font-weight: bold;
            }
          }
          .hot-song-des{
            font-size: 20px;
            color: #aaa;
          }
        }
      }
      .hot-song-playCount{
        font-size: 20px;
        color: #aaa;
      }
    }
  }
}
</style>
