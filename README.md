# vue-163-musci

使用vue全家桶 开发 安卓端 网易云音乐 webapp

数据接口感谢Binaryify大神提供 https://github.com/Binaryify/NeteaseCloudMusicApi

## 技术栈

1. Vue全家桶(vue,vue-router,vuex)
2. axios(http)
3. vant组件库
4. postcss-pxtorem - amfe-flexible
   - amfe-flexible
     - 根据屏幕动态改变根元素font-size
   - postcss-pxtorem
     - 自动把代码中px转为rem

## 部署

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

## 三、 axios

### 1. 配置baseURL

```
+ http://h5sm.com:8088
```