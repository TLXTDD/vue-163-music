<template>
  <div class="UserPage">
    <div class="user-info">
      <van-sticky :offset-top="0">
        <i class="iconfont icon-fanhui"></i>
      </van-sticky>
      <div class="user-details">
        <div class="user-avatar">
          <van-image
            round
            width="100%"
            height="100%"
            fit="cover"
            :src="userData.avatarUrl"
          />
        </div>
        <p class="user-nickname">{{ isLogin || userData.nickname }}</p>
        <p class="user-size">
          <span>关注：{{ isLogin || userData.follows }}</span>
          <span>|</span>
          <span>粉丝：{{ isLogin || userData.followeds}}</span>
        </p>
        <p class="user-level">
          <van-tag round ><i>Lv.7</i></van-tag>
        </p>
      </div>
    </div>
    <button @click="handleLogout">退出</button>
    <LoginPage />
  </div>
</template>

<script>
import { getLogout } from '../../common/api'
import LoginPage from '../Login/LoginPage'
export default {
  name: 'UserPage',
  data () {
    return {
      userData: {},
      isLogin: '未登录'
    }
  },
  components: {
    LoginPage
  },
  created () {
    const { userData } = this.$route.query
    this.userData = userData
  },
  methods: {
    async handleLogout () {
      const data = await getLogout()
      this.$toast(data.data.code)
    }
  }
}
</script>

<style lang="less" scoped>
.UserPage{
  background-color: #333;
  height: 100vh;
  overflow: hidden;
}
.user-info{
  position: relative;
  height: 570px;
  background-size: cover;
  .user-details{
    padding-top: 120px;
    padding-left: 40px;
    .user-avatar{
      //position: absolute;
      //left: 30px;
      //bottom: 200px;
      width: 150px;
      height: 150px;
    }
    .user-nickname{
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 32px;
      color: #fff;
      font-weight: 600;
    }
    .user-size{
      font-size: 20px;
      color: #aaa;
    }
    .user-level .van-tag {
      margin-top: 15px;
      padding: 2px 15px;
    }
  }
}
</style>
