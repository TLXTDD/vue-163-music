import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

// 全局组件
import VideoPlay from '../components/Video/VideoPlay'
import Banner from '../components/Discover/DiscoverBanner'
import SongSheetCategory from '../components/RankList/SongSheetCategory'
import BottomBarPlay from '../components/Player/BottomBarPlay'
import SongPlayList from '../components/TodayRecommend/SongPlayList'

import {
  Swipe, SwipeItem,
  Lazyload,
  Tag,
  Tab, Tabs,
  Image as VanImage,
  Divider,
  Badge,
  Sticky,
  NavBar,
  Field,
  Icon,
  Slider,
  Button, Toast, Circle, Form
} from 'vant'

Vue.use(Swipe).use(SwipeItem)
  .use(Lazyload)
  .use(Tag)
  .use(Tab).use(Tabs)
  .use(VanImage)
  .use(Divider)
  .use(Badge)
  .use(Sticky)
  .use(NavBar)
  .use(Field)
  .use(Icon)
  .use(Slider)
  .use(Button)
  .use(Toast)
  .use(Circle)
  .use(Form)

// 全局组件
Vue.component('VideoPlay', VideoPlay)
Vue.component('Banner', Banner)
Vue.component('SongSheetCategory', SongSheetCategory)
Vue.component('BottomBarPlay', BottomBarPlay)
Vue.component('SongPlayList', SongPlayList)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
