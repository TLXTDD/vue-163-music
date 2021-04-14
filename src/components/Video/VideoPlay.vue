<template>
  <section>
    <div v-for="(item) in videoList" :key="item.data.vid">
      <div class="VideoPlay">
        <div class="video-con">
          <VideoPlayMv :poster="item.data.coverUrl" :vid="item.data.vid"/>
        </div>
        <div class="video-title">
          <span>{{item.data.title}}</span>
          <van-image
            round
            class="arc-img"
            :src="item.data.creator.avatarUrl"
          />
        </div>
        <van-divider
          :style="{ borderColor: '#bbb'}"
        />
        <div class="video-user">
          <div class="user-info">
            <van-image
              round
              class="user-img"
              :src="item.data.creator.avatarUrl"
            />
            <span>
            {{ item.data.creator.nickname || '' }}
          </span>
          </div>
          <div class="link">
            <van-badge :content="item.data.commentCount" max="9999">
              <div class="iconfont icon-dianzan"></div>
            </van-badge>
            <van-badge :content="item.data.shareCount" max="9999">
              <div class="iconfont icon-pinglun"></div>
            </van-badge>
            <div class="iconfont icon-caidan-copy"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getVideoCatePlayList } from '../../common/api'
import VideoPlayMv from './VideoPlayMv'
export default {
  name: 'VideoPlay',
  components: {
    VideoPlayMv
  },
  data () {
    return {
      videoList: []
    }
  },
  // methods: {
  //   handleAvatarUrl (pic, img) {
  //     console.log(pic)
  //     console.log(img)
  //     return 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=251289958,1860898046&fm=26&gp=0.jpg'
  //   },
  //   handleIsEmptyJsons (v) {
  //     // console.log(JSON.stringify(v) == '{}')
  //     return JSON.stringify(v) != '{}'
  //   }
  // },
  props: ['id'],
  async created () {
    try {
      const videoList = await getVideoCatePlayList(this.id)
      this.videoList = videoList.data.datas
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.VideoPlay {
  height: 590px;
  padding: 0 30px 20px;
  background-color: #fff;

  .video-con {
    height: 384px;
    border-radius: 20px;
    overflow: hidden;

    .video {
      object-fit: cover;
    }
  }

  .video-title {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #454545;

    .arc-img {
      width: 68px;
      height: 68px;
    }
  }

  .video-user {
    display: flex;
    justify-content: space-between;

    .user-info {
      display: flex;
      align-items: center;

      .user-img {
        width: 56px;
        height: 56px;
        margin-right: 8px;
      }

      span {
        font-size: 22px;
      }
    }

    .link {
      display: inherit;
      align-items: center;

      & > div {
        width: 40px;
        height: 40px;
        margin-left: 35px;
      }
    }
  }
}
</style>
