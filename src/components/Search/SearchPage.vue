<template>
  <div class="SearchPage">
    <van-sticky>
      <div class="search-wrap">
        <i class="iconfont icon-fanhui" @click="handleBack"></i>
        <div class="search-filed">
          <van-field
            v-model="keywords"
            placeholder="搜索"
            @input="handleInput"
          />
        </div>
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="search-song-name-list" v-if="isSearch">
        <ul>
          <li
            v-for="(item,index) in selectList"
            :key="index"
            @click="handleSearchKeyword(item.keyword)"
          >
            <van-icon name="search" />
            <span>{{ item.keyword }}</span>
          </li>
        </ul>
      </div>
    </van-sticky>
    <div v-if="isShowHotSearchRank">
      <SearchSongNameList :keywords="keywords"/>
      <HotSearchList/>
    </div>
    <SongPlayList :songLists="songLists" />
  </div>
</template>

<script>
import HotSearchList from './HotSearchList'
import SearchSongNameList from './SearchSongNameList'
import { getSearchKeywords, getSearchSuggest } from '../../common/api'
import Bus from '../../common/Bus'
export default {
  name: 'SearchPage',
  components: {
    HotSearchList,
    SearchSongNameList
  },
  created () {
    Bus.$on('handleKeywords', (res) => {
      this.handleSearchKeyword(res)
    })
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    async handleSearchKeyword (v) {
      try {
        const songLists = await getSearchKeywords(v)
        const list = songLists.data.result.songs
        this.isSearch = false
        this.isShowHotSearchRank = false
        this.songLists = list
      } catch (e) {
        console.log(`无法搜索到${v}`)
      }
    },
    async handleInput (v) {
      if (v === '') {
        this.isSearch = false
        return
      }
      try {
        const selectList = await getSearchSuggest(v)
        const list = selectList.data.result.allMatch
        this.selectList = list
        if (list.length) {
          this.isSearch = true
        }
      } catch (e) {
        console.log(`你输入的${v}不正确`)
      }
    }
  },
  data () {
    return {
      text: '',
      isSearch: false,
      keywords: '',
      selectList: [],
      songLists: [],
      isShowHotSearchRank: true
    }
  }
}
</script>

<style lang="less" scoped>
.SearchPage{
  .search-song-name-list{
    z-index: 1;
    position: absolute;
    left: 30px;
    top: 100px;
    width: 600px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    li{
      display: flex;
      height: 88px;
      padding-left: 25px;
      border-bottom: 1px solid #eee;
      align-items: center;
      font-size: 30px;

      span{
        margin-left: 15px;
      }
    }
  }
  .search-wrap{
    display: flex;
    background-color: white;
    justify-content: space-evenly;
    align-items: center;
    & > i {
      font-size: 40px;
    }
    .search-filed{
      width: 516px;
      border-bottom: 1px #929292 solid;
    }
  }
}
</style>
