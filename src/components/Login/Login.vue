<template>
  <div class="Login">
    <div v-if="false" class="login-method">
      <div class="logo">
        <van-image
          width="100%"
          height="100%"
          lazy-load
          :src="logo"
        />
      </div>
      <div class="login-btn">
        <van-tag text-color="#f00" color="#fff" round>手机号登录</van-tag>
        <van-tag text-color="#fff" round plain>立即体验</van-tag>
      </div>
    </div>

    <div class="input-tel" v-if="false">
      <van-nav-bar
        :left-text="loginMsg"
        left-arrow
        @click-left="onClickLeft"
      />

      <van-field
        v-model="tel"
        type="tel"
        label="+86"
        placeholder="请输入手机号"
      />
      <van-tag text-color="#fff" color="#db2d1f" round>下一步</van-tag>
    </div>

    <div class="input-pwd">
      <van-nav-bar
        :left-text="loginMsg"
        left-arrow
        @click-left="onClickLeft"
      />

      <van-field v-model="password" type="password" label="密码" />

      <van-tag text-color="#fff" color="#db2d1f" round>下一步</van-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      logo: require('../../assets/img/163.png'),
      loginMsg: '手机号密码',
      tel: '',
      password: ''

    }
  },
  methods: {
    onClickLeft () {
    }
  }
}
</script>

<style lang="less" scoped>
.Login{
  height: 100vh;
  overflow: hidden;

  .login-method{
    height: 100vh;
    background-color: #db2d1f;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .logo{
    width: 150px;
    height: 150px;

  }

  .login-btn{
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    /deep/ .van-tag--plain{
      background: transparent;
    }

    span {
      font-size: 30px;
      padding: 20px 190px;
    }
  }

  .input-tel {
    display: flex;
    flex-direction: column;
    padding: 0 30px;

    /deep/ .van-tag {
      font-size: 30px;
      padding: 20px 288px;
    }

  }

  .input-pwd{
    padding: 0 20px;

    /deep/ .van-tag {
      font-size: 30px;
      padding: 20px 288px;
    }
  }

  /deep/ .van-nav-bar{
    i,span {
      color: #000;
    }
  }
}
</style>
