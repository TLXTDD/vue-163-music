const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  devServer:{
    open:true,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75, // 要style直接写px单位, 1rem=75px,
            propList: ['*'], // 对所有css属性单位转换
            exclude: /(node_module)/, // 排除掉node_module目录，不对vant单位转换rem
            unitPrecision: 2, // 允许rem的小数长度
            mediaQuery: true, // 允许在媒体查询中转换px
            minPixelValue: 3, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
            selectorBlackList: ['abc'] // 要忽略并保留为px的选择器
          })
        ]
      }
    }
  }
}
