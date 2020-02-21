import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
var home = ()=> import( 'views/home/home.vue');
var cart = ()=> import( 'views/cart/cart.vue');
var category = ()=> import( 'views/category/category.vue');
var profile = ()=> import( 'views/profile/profile.vue');
var detail = ()=> import( 'views/detail/detail.vue');

var relation = [
  {
    path:"",
    redirect: '/home'
  },
  {
    path:"/home",
    component: home
  }
  ,
  {
    path:"/cart",
    component: cart
  }
  ,
  {
    path:"/category",
    component: category
  }
  ,
  {
    path:"/profile",
    component: profile
  }
  ,
  {
    path:"/detail/:id",
    component: detail
  }
]

export default new Router({
  routes: relation,
  mode: 'history'
})
