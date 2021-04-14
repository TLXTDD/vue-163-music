<template>
  <ul class="BottomSheetPlayList">
    <li v-for="(item,index) in playerlist" :key="item.id" class="playList">
      <div class="playPic">
        <van-image
          round
          width="100%"
          height="100%"
          fit="cover"
          lazy-load
          :src="picUrl[index]"
        />
      </div>
      <div class="playName">
        <p :class="currentPlaySongIndex==index?'active':''">
        {{ item.name }}{{ (item.dj? '- '+item.dj.nickname : songName[index]) }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import MusicUtils from '../../common/MusicUtils'

export default {
  name: 'BottomSheetPlayList',
  data () {
    return {
      playerlist: [],
      songName: [],
      currentPlaySongIndex: 0,
      picUrl: []
    }
  },
  created () {
    const storage = MusicUtils.getLocalStorageSongPlayList('playerlist')
    const currentPlaySongIndex = MusicUtils.getLocalStorageSongPlayList('currentPlaySongIndex')
    this.currentPlaySongIndex = currentPlaySongIndex
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].radio) {
        this.picUrl.push(storage[i].radio.picUrl)
      } else {
        this.picUrl.push(storage[i].al.picUrl)
      }
    }
    this.playerlist = storage
    if (storage[0].ar) {
      this.songName = this.stringSplicing(storage)
    }
  },
  methods: {
    stringSplicing (storage) {
      const songName = []
      for (let j = 0; j < storage.length; j++) {
        let str = ''
        for (let i = 0; i < storage[j].ar.length; i++) {
          str += '-' + storage[j].ar[i].name
        }
        songName.push(str)
      }
      return songName
    }
  }
}
</script>

<style lang="less" scoped>
.BottomSheetPlayList{
  padding: 20px;
  .playList{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 50px;
    padding: 20px 0;
    .playPic{
      width: 7%;
    }
    .playName{
      width: 90%;
      font-size: 20px;
      color: #393939;
      &>p{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.active{
          font-weight: bold;
          color: #db2d1f;
        }
      }
    }
  }
}
</style>
