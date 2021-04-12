<template>
    <div class="playList">
      <ui>
        <li
          v-for="(item,index) in songLists"
          :key="index"
          @click="handleGoToPlayPage(item.id, item.name, (item.artists && item.artists[0]['name']) || (item.ar&&item.ar[0]['name']))"
        >
          <div class="songDes">
            <div class="songPic" v-if="item.al">
              <img
                fit="cover"
                width="100%"
                height="100%"
                lazy-load
                :src="(item.al && item.al.picUrl) || item.album.artist.img1v1Url"
                alt=""
              >
            </div>
            <div class="songInfo">
              <p class="title">{{ item.name }}</p>
              <p class="subTitle" v-if="item.artists"> {{item.artists[0]['name']}} - {{item.album.name}} </p>
              <p class="subTitle" v-else-if="item.al"> {{item.ar[0]['name']}} - {{item.al.name}} </p>
            </div>
          </div>
          <div class="songMv">
            <i class="iconfont icon-Play-Button"></i>
          </div>
        </li>
      </ui>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import MusicUtils from '../../common/MusicUtils'
export default {
  name: 'SongPlayList',
  props: {
    songLists: {
      type: Array,
      require: true
    }
  },
  methods: {
    ...mapMutations(['playSong', 'setVolume']),
    ...mapActions(['getMusicUrl']),
    handleGoToPlayPage (id, name, author) {
      const storage = MusicUtils.getLocalStorageSongPlayList('historyPlayList')
      storage.push(name)
      MusicUtils.setLocalStorageSongPlayList(storage, 'historyPlayList')
      this.$router.push({
        path: 'play',
        query: { id, name, author }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.playList{
  padding: 0 26px;

  li{
    display: flex;
    height: 120px;
    justify-content: space-between;
    align-items: center;
  }

  .songDes{
    display: flex;
    max-width: calc( 100% - 80px );

    .songPic{
      width: 74px;
      height: 74px;
      border-radius: 10px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .songInfo{
      display: flex;
      margin-left: 24px;
      color: #aaa;
      font-size: 20px;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title{
        color: #333;
        span{
          color: #aaa;
        }
      }

      .subTitle{
        font-size: 14px;
      }
    }
  }
}

</style>
