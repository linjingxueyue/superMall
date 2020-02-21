module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport':{
      viewportWidth:375,
      viewportHeight:667,   // 对应设计稿的高度， 很多时候 可以不配制
      unitPrecision:5,  // 指定 px 转换为视窗单位值得最小位数，（很多时候无法整除）
      viewportUnit:'vw',  // 指定需要转换为的视窗单位
      // selectorBlackList:['ignore','tabbar'],    // 指定 不需要 转换的 类
      minPixelValue:1,      // 小于 或 等于 1px 不转换为视窗单位
      mediaQuery:false,      // 允许在媒体查询中转换 px
      // exlcude:['TabBar.vue','TabBar_Item.vue','tabbar_main.vue']
      // exlcude: [/tabbar/i]
    }
  }
}
