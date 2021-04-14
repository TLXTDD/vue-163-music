<template>
  <van-sticky>
    <div class="HomeHeader" :class="headColor">
      <i class="left iconfont icon-liebiao"></i>
      <div class="center">
          <span
            v-for="(item,index) in cate"
            :key="index"
            :class="{active:index===activeIndex?true:false, hover:index===activeIndex?true:false}"
            @click="handleClick(index)"
          >
            {{item}}
          </span>
      </div>
      <router-link to="/search" class="right iconfont icon-sousuo"></router-link>
    </div>
  </van-sticky>
</template>

<script>
// 时间车
import Bus from '../../common/Bus'
import MusicUtils from '../../common/MusicUtils'
export default {
  name: 'HomeHeader',
  data () {
    return {
      cate: ['我的', '发现', '视频'],
      headColor: ''
    }
  },
  props: {
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleClick (index) {
      if (index === 0) this.headColor = 'dark'
      else this.headColor = ''

      Bus.$emit('switchPage', index)

      if (index === 0) {
        this.setScrollTop()
        MusicUtils.scrControl(0)
      } else if (index === 1) {
        MusicUtils.scrControl(1)
      }
    },
    setScrollTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .dark {
    background-color: rgba(0,0,0,.7) !important;
    .left,.right{
      color: #fff !important;
    }
    .center{
      .hover{
        color: #fff !important;
      }
    }
  }
  .HomeHeader{
    display: flex;
    height: 100px;
    background-color: rgba(255,255,255,.9);
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    .left,
    .right{
      font-size: 40px;
    }
    .center{
      display: flex;
      width: 480px;
      justify-content: space-evenly;
      span{
        font-size: 36px;
        color: #797979;
      }
      .active{
        font-weight: bold;
        color: #000;
      }
    }
  }
</style>
