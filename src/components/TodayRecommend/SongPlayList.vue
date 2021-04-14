<template>
    <div class="playList">
      <ul>
        <li
          v-for="(item,index) in songLists"
          :key="index"
          @click="handleGoToPlayPage(item, index, item.name, (item.name || item.artists && item.artists[0]['name']) || (item.ar&&item.ar[0]['name']), item.al?(item.al && item.al.picUrl) || item.radio.picUrl  || item.album.artist.img1v1Url:'https://img.yzcdn.cn/vant/cat.jpeg')"
        >
          <div class="songDes">
            <div class="songPic" v-if="item.al || item.radio.picUrl">
              <img
                fit="cover"
                width="100%"
                height="100%"
                lazy-load
                :src="(item.al && item.al.picUrl) || item.radio.picUrl || item.album.artist.img1v1Url "
                alt=""
              >
            </div>
            <div class="songInfo">
              <p class="title">{{ item.name }}</p>
              <p class="subTitle" v-if="item.artists"> {{item.artists[0]['name']}} - {{item.album.name}} </p>
              <p class="subTitle" v-else-if="item.al"> {{item.ar[0]['name']}} - {{item.al.name}} </p>
              <p class="subTitle" v-else-if="item.dj"> {{item.dj.nickname}} - {{item.dj.brand}} </p>
            </div>
          </div>
          <div class="songMv">
            <i class="iconfont icon-Play-Button"></i>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import MusicUtils from '../../common/MusicUtils'
import { Toast } from 'vant'
export default {
  name: 'SongPlayList',
  props: {
    songLists: {
      type: Array,
      require: true
    }
  },
  methods: {
    ...mapMutations(['playSong', 'setVolume', 'setHistoryPlayList', 'setPlayerList']),
    ...mapActions(['getMusicUrl', 'getMusicLyric']),
    async handleGoToPlayPage (item, index, name, author, pic) {
      let id = 0
      if (this.songLists[index].mainSong) {
        id = this.songLists[index].mainSong.id
      } else {
        id = this.songLists[index].id
      }
      await this.setPlayerList({
        index,
        list: this.songLists
      })
      const r = await this.getMusicUrl({ id, name, author, pic })
      if (!r) {
        Toast('此歌曲无版权，无法播放')
        return
      }
      await this.getMusicLyric(id)
      await this.setVolume()
      await this.playSong()
      // 存取历史记录
      const storage = MusicUtils.getLocalStorageSongPlayList('historyPlayList')
      storage.push(name)
      this.setHistoryPlayList(storage)
      this.$router.push({
        path: '/play'
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
