// 发现页面
// 轮播图
export function getBanner (url) {
  // eslint-disable-next-line no-undef
  return axios.get(url)
}
// 精品歌单 推荐歌单
export function getPersonalized () {
  // eslint-disable-next-line no-undef
  return axios.get('/personalized?limit=8')
  // return axios.get('/top/playlist/highquality?limit=8')
}
// 每日推荐歌单
export function getRecommendSongSheet (cat = '华语') {
  // eslint-disable-next-line no-undef
  return axios.get(`/top/playlist?limit=24&order=hot&cat=${cat}`)
  // return axios.get('/personalized?limit=24')
}

// 视频分类
export function getVideoCate () {
  // eslint-disable-next-line no-undef
  return axios.get('/video/category/list')
}
// 视频内容
export function getVideoCatePlayList (id) {
  // eslint-disable-next-line no-undef
  return axios.get(`/video/group?id=${id}`)
}
// 获取视频播放地址
export function getVideoCatePlayUrl (id) {
  // eslint-disable-next-line no-undef
  return axios.get(`/video/url?id=${id}`)
}
// 每日推荐歌曲
export function getToDayRecommend () {
  // eslint-disable-next-line no-undef
  return axios.get('recommend/songs')
}
//  歌单分类
export function getSongSheetsCate () {
  // eslint-disable-next-line no-undef
  return axios.get('/playlist/hot')
}
// 歌单详情
export function getHomeSongSheetsDetail (id) {
  // eslint-disable-next-line no-undef
  return axios.get(`/playlist/detail?id=${id}`)
}
//  排行榜 内容
export function getRankList () {
  // eslint-disable-next-line no-undef
  return axios.get('/toplist/detail')
}

//  电台
export function getHomeDjRecommend () {
  // eslint-disable-next-line no-undef
  return axios.get('/dj/category/recommend')
  // return axios.get('/dj/category/recommend?limit=3')
}
//  电台
export function getHomeDjTopList () {
  // eslint-disable-next-line no-undef
  return axios.get('/dj/program/toplist/hours?limit=30')
}
//  热搜榜
export function getSearchHotDetail () {
  // eslint-disable-next-line no-undef
  return axios.get('/search/hot/detail')
}
//  搜索可能感兴趣
export function getSearchMultimatch (keywords) {
  // eslint-disable-next-line no-undef
  return axios.get(`/search/multimatch?keywords=${keywords}`)
}
//  搜索关键词
export function getSearchKeywords (keywords) {
  // eslint-disable-next-line no-undef
  return axios.get(`/search?keywords=${keywords}&limit=15`)
}
//  搜索建议 下拉列表
export function getSearchSuggest (keywords) {
  // eslint-disable-next-line no-undef
  return axios.get(`/search/suggest?keywords=${keywords}&type=mobile`)
}
//  检查 是否已经注册  只处理注册了的 登录
export function getCheckTelReg (phone) {
  // eslint-disable-next-line no-undef
  return axios.get(`/cellphone/existence/check?phone=${phone}`)
}
// 登录
export function PostLogin (username, password) {
  // eslint-disable-next-line no-undef
  return axios.post('/login/cellphone', {
    phone: username,
    password: password
  })
}
// 退出登录
export function getLogout () {
  // eslint-disable-next-line no-undef
  return axios.get('/logout')
}
// 获取播放地址
export function getMusicUrl (id) {
  // eslint-disable-next-line no-undef
  return axios.get(`/song/url?id=${id}`)
}
// 获取歌词
export function getMusicLyric (id) {
  // eslint-disable-next-line no-undef
  return axios.get(`/lyric?id=${id}`)
}
