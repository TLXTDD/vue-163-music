import Home from '../views/Home'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: ''
    }
  },
  {
    path: '/video',
    component: () => import('../components/Video/VideoPage'),
    meta: {
      title: '视频'
    }
  },
  {
    path: '/recommend',
    component: () => import('../components/TodayRecommend/Recommend'),
    meta: {
      title: '每日推荐'
    }
  },
  {
    path: '/songsheet',
    component: () => import('../components/SongSheetList/SongSheetPage'),
    meta: {
      title: '歌单广场'
    }
  },
  {
    path: '/rank',
    component: () => import('../components/RankList/RankPage'),
    meta: {
      title: '排行榜'
    }
  },
  {
    path: '/dj',
    component: () => import('../components/Dj/DjPage'),
    meta: {
      title: '电台'
    }
  },
  {
    path: '/search',
    component: () => import('../components/Search/SearchPage'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/user',
    component: () => import('../components/UserCenter/UserPage'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/play',
    component: () => import('../components/Player/PlayPage'),
    meta: {
      title: '音乐播放'
    }
  },
  {
    path: '/login',
    component: () => import('../components/Login/LoginPage'),
    meta: {
      title: '登录'
    }
  }
]
