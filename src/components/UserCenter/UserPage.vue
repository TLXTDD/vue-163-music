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
            :src="userData.avatarUrl || usetAvatar"
          />
        </div>
        <p class="user-nickname">{{ userData.user || isLogin }}</p>
        <p class="user-size">
          <span>关注：{{ userData.follows || isLogin }}</span>
          <span>|</span>
          <span>粉丝：{{ userData.followeds===0?'0':userData.followeds || isLogin }}</span>
        </p>
        <p class="user-level">
          <van-tag round ><i>Lv.7</i></van-tag>
        </p>
      </div>
    </div>
    <button @click="handleLogout">退出</button>
    <LoginPage v-if="!userData"/>
  </div>
</template>

<script>
import { getLogout } from '../../common/api'
import LoginPage from '../Login/LoginPage'
import Cookies from 'js-cookie'
export default {
  name: 'UserPage',
  data () {
    return {
      userData: '',
      isLogin: '未登录',
      usetAvatar: 'https://p3.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg'
    }
  },
  components: {
    LoginPage
  },
  created () {
    const userData = Cookies.getJSON('userdata')
    if (userData) {
      this.userData = userData
    }
  },
  methods: {
    async handleLogout () {
      const data = await getLogout()
      if (data.data.code === 200) {
        Cookies.remove('token')
        // Cookies.set('cookie', loginData.cookie, { expires: 1 })
        Cookies.remove('userId')
        // Cookies.set('avatarUrl', loginData.profile.avatarUrl, { expires: 1 })
        Cookies.remove('userdata')
        Cookies.remove('MUSIC_U')
        Cookies.remove('NMTID')
        Cookies.remove('__csrf')
        Cookies.remove('__remember_me')
        this.$toast('退出登录')
        location.reload()
      }
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
