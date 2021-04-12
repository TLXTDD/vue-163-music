<template>
  <div class="LoginPage">
    <van-form @submit="onSubmit">
      <van-field
        autocomplete="off"
        v-model="username"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ validator:validatorUname,required: true, message: '请填写正确手机号' }]"
      />
      <van-field
        autocomplete="off"
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ validator:validatorPwd,required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import { getCheckTelReg, PostLogin } from '../../common/api'
import Cookies from 'js-cookie'

export default {
  name: 'LoginPage',
  data () {
    return {
      logo: require('../../assets/img/163.png'),
      loginMsg: '手机号密码',
      tel: '',
      password: '',
      username: '',
      userInfo: {}
    }
  },
  methods: {
    validatorUname (v) {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(v)
    },
    validatorPwd (v) {
      return /^.*/.test(v)
    },
    onClickLeft () {
    },
    async onSubmit (values) {
      const { username, password } = this
      const isReg = await getCheckTelReg(username)
      const isRegData = isReg.data.exist
      if (isRegData === -1) {
        this.$toast('请先到网易云官网注册')
        return
      }
      const login = await PostLogin(username, password)
      const loginData = login.data
      const userData = loginData.profile
      console.log(loginData)
      if (loginData.code === 200) {
        this.$toast('登录成功')
        this.$router.push({
          path: '/video',
          query: { userData }
        })
      }
      Cookies.set('token', loginData.token, { expires: 1 })
      Cookies.set('cookie', loginData.cookie, { expires: 1 })
      Cookies.set('userId', loginData.profile.userId, { expires: 1 })
      Cookies.set('avatarUrl', loginData.profile.avatarUrl, { expires: 1 })
    }
  }
}
</script>

<style lang="less" scoped>
.LoginPage{
  height: 100vh;
  overflow: hidden;

  .login-method{
    height: 100vh;
    background: #db2d1f;

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
    /*border: 1px yellow solid;*/

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
