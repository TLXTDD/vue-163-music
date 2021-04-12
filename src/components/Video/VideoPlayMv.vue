<template>
  <video
    width="100%"
    height="100%"
    class="video"
    :poster="poster"
    :src="video.url"
    controls
  ></video>
</template>

<script>
import { getVideoCatePlayUrl } from '../../common/api'
export default {
  name: 'VideoPlayMv',
  data () {
    return {
      video: {}
    }
  },
  props: ['poster', 'vid'],
  async created () {
    try {
      const video = await getVideoCatePlayUrl(this.vid)
      this.video = video.data.urls[0]
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
