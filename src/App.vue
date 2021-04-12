<template>
  <div id="app">
    <router-view/>
    <BottomBarPlay
      :isShowBottomBarPlayBtn="isShowBottomBarPlayBtn"
      :rate="rate"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowBottomBarPlayBtn: true,
      rate: 100
    }
  }
}
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  html{
    max-width: 750Px;
    margin: auto;
  }
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
  }
  li{
    list-style-type:none;
  }
  @import "./assets/common.css";
</style>
