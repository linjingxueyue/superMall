import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'
Vue.use(toast)
// 使用 懒加载 插件
Vue.use(LazyLoad,{
  loading:require('./assets/images/common/placeholder.png')
})
// 解决 移动端 300ms 延迟的问题
FastClick.attach(document.body)

Vue.config.productionTip = false
//-------- 创建$bus-------vue 实例 可以作为 事件总线的
Vue.prototype.$bus = new Vue()
 console.log(this,'---')
new Vue({
  router,
  store,
  render: h => h(App), 
}).$mount('#app') 
 