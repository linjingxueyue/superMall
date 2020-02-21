# ------------------------------------ webpack  ---------------------------------

# 
    loader :   -    ----------- 帮助 webpack 处理 js 以外的文件

     css-loader:    // 只负责加载 ，不负责解析

   style-loader:         //  负责将样式添加到DOm 中，使他生效

    file-loader:    把css 输出为css文件
-------------------    // 使用多个loader 时候，是从右向左读的. 具体见webpack.config,js 里面关于css的配置


    postcss-loader          --- 加载css  ，以及解析里面的每一个样式
   
    autoprefixer           是一个插件   ---- 根据浏览器兼容表，选择性的添加浏览器 加 css 样式前缀. 

    file-loader:
            作用：file-loader可以用来帮助webpack打包处理一系列的图片文件；比如：.png 、 .jpg 、.jepg等格式的图片；

    url-loader
        可以通过limit属性对图片分情况处理，当图片小于limit（单位：byte）大小时转base64，大于      limit时调用file-loader对图片进行处理。

    url-loader 与 file-loader
            相同点：都是在webpack中处理图片、字体图标等文件。

            关系：url-loader封装了file-loader，但url-loader并不依赖于file-loader

   
     devtool:'source-map'     保留 原始代码的 风格， 当出错时候，容易 观察
                            不然编译过后，想要 观察哪里出错了比较麻烦


    webpack-dev-server:         直接启动不行，必须写在package.json的scripts里面，详细看 06_webpack的插件的使用
                             package.json 里面： 脚本 webpack-dev-server --open 参数open的作用是 直接打开浏览器并加载localhost:port 页面，不加的话 是手动打开

    alias:                 这里是起别名的地方   注意： import（）里面路径可以直接用， 别的例如src属性就要在前面加一个 ~。例子在 day04_vue-cli脚手架/05_TabBar案例

# webpack loader 与 plugin 的区别
  ### 插件的使用 见 ---06_webpack的插件的使用
    plugin ：是插件的意思，意思是对于某个现有架构的扩展，
    区别：
        loader: 主要用于转换某些类型的模块，它是一个转换器
        plugin：它是对于webpack 本身的扩展，是一个扩展器
    plugin 的 使用过程：
        1： 通过npm 安装需要使用的plugin(某些plugin已经内置于webpack，不需要安装)
        2： 在 webpack.config.js 中的plugins中配置插件

    uglifyjs-webpack-plugin： 代码压缩
    html-webpack-plugin：     生成 html
    webpack.BannerPlugin:     自动添加注释 

   
# webpack.config.js 代码的分离：
    1： 可以建立build文件夹
            创建 dev.config.js   prod.config.js  base.config.js
    2:  开发时候：  dev.config.js ＋base.config.js
        生产时候：  prod.config.js +  base.config.js
    3： 需要 webpack-merge 安装包

##   代码质量管理           --- eslint

##   测试               --- 单元测试    
                                jest 
                        npm i jest(核心库) jest-webpack(webpack与jest的接口库)
                        --- 集成测试

# ------------------------------------ vue cli ---------------------------------
 ## 1：简介
        CLI: 是commnd-line-interface,翻译为命令行界面， 但是 俗称 脚手架
            它是官方发布的vue.js项目脚手架
            使用它可以快速搭建vue开发环境以及对应的webpack 配置

        vuecli 就是使用了webpack模板， 对所有的资源进行压缩等优化，它在开发过程中提供了一套完整的功能，能够使得我们
               开发过程变得高效
 ## 2： 安装：
            安装前提：   安装 node , 全局安装webpack => npm install webpack -g
            1: 全局安装vuecli（vuecli3 的版本）  npm install @vue/cli -g

            2：vuecli2 创建项目： vue create 项目名字
               a: 通过 npm install -g @vue/cli-init 拉取vuecli2 的版本， 这样可以在vuecl3.x版本中创建2.x版本的模板
               b: 创建项目： vue init webpack 项目名称

               c: 2.x模板： build config 都是webpack相关配置，其中build 侧重配置的过程，config 主要是配置中变量信息的存储
               d: runtimeonly 与 runtimecompiler 的区别
                    代码层面：
                            runtimecompiler：    new Vue({
                                                        el: '#app',
                                                        components: { App },
                                                        template: '<App/>'
                                                    })

                                runtimeonly：   new Vue({
                                                        el: '#app',
                                                        render:h=>{h(APP)}
                                                   })                         
                    运行过程：
                            runtimecompiler：   template ==>ast ==》 render ===> virtual DOM ==> 真实DOM
                            runtimeonly：       render ===> virtual DOM ==> 真实DOM

                    解析： runtimeonly中 是谁帮我们把.vue文件里面的template解析的呢？
                            我们之前安装vue-loader 时候也需要安装vue-template-complier,是它帮我们把.vue文件解析为一个对象。
                            h： 其实是一个createEmplate()函数,用于将 虚拟DOM 转为真实DOM；
                                见day04_vue_cli脚手架/01——vuecli2_test 里的main.js

            3：vuecli3 创建项目： vue create 项目名字
                    原则： 0 配置，移除配置文件根目录下的build与config目录。
                          移除static文件夹，并将index.html放入static文件夹内部
                          vuecli3会自动生成.git文件夹，并把东西放进去
                    查看配置的方式：
                        一：启动一个服务    vue ui
                        二：node_modules/@vue/cli-service/webpack.config.js
                    修改配置的方式：
                        在根目录下，创建 vue.config.js
# ----------------------------- VUE Router ------------------------------------------------
 ## 1: 前端渲染  与  后端渲染 （推荐看codewhy 的 p100 ）
        三个阶段： 后端路由(渲染) ==》前后端分离==》 前端路由(渲染)
                    实际 前后的分离 以及 前端路由（渲染） 都属于前端渲染

        后端路由： 网页与url之间的映射关系，由后端处理、保存，就称之为后端路由
        前后端分离: 后端只提供 数据， 不负责任何阶段的内容
        前端路由=》单页面副应用(SPA)阶段：
                就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则
                整个网页只有一个html页面
                静态资源服务器只有一套 html + css + js,当界面发生点击事件后，从这一套代码中，抽离出对应的
            html+css+js来完成页面的组合及显示。而根据url进行抽离的技术中，这种url就是前端路由。
                在vue中，抽离的资源其实就是一个个的组件。使用的技术就是 vue-router.
                url 与 一套html + css + js之间的映射关系，就是由前端来管理。就是前端路由。
                前端路由的核心在于：
                        改变url,使得页面不进行刷新 

 ## 修改url 页面不刷新：
            方式1：修改url的hash。也就是锚点。 本质上是修改window.location的href属性
                location.hash = 'xxx'
            方式2：利用html5的 history模式：
                    history.pushState({},'','xxx')  //  前进
                    history.back()                  // 后退
                    history.replaceState()          // 代替当前， 浏览器左上角的后退箭头失效（不保留历史记录）
                    history.go(-1)  等价于    history.back()      // 后退1
                    history.go(1)   等价于    history.forward()        // 前进1

#  
 ## 所有的组件 都继承自VUE的原型
 ## $router与 $route的区别：
        $router 为VueRouter实例，想要导航到不同URL，则使用$router.push方法
        $route 为当前router跳转对象，里面可以获取 name,path,quey,params等
 ## 导航守卫  ----------------  参考与 day04_vue-cli脚手架/04_vue_router
    全局导航守卫   beforeEach    afterEach
    路由独享守卫   beforeEnter
    组件内的守卫   beforeRouteEnter beforeRouteUpdate beforeRouteLeave
 # keep-alive 组件 与router-view 组合
     keep-alive 组件 是 VUE内置的一个组件，可以使被包含的组件保留状态 或 避免重新渲染（销毁），
     router-view 是VUE-Router内置的一个组件， 当它被keep-alive 包含在内部时候，所有路径匹配到的视图组件都会被缓存
     activated 与 deactivated 函数 用于观察组件是否处于活跃状态，但只有使用keep-alive包含router-view时候才有效，
   没有包含时候，不会触发
      keep-alive 的 exclude 属性 可以排除某些组件，使得这些组件每次重新点开都会重新创建。exclude="xxx",xxx就是组件创建时候的name 值。这个name一般时候没有用。

# ------------------------------------ vueX ---------------------------------     
    vuex 的学习 见 day05/01_vuex

    补充 知识点：
         import{mapGetters,mapActions} from 'vuex'
    
# ------------------------------------ axios ---------------------------------     
    网络模块的测试 可以使用 https://httpbin.org
    vuex 的学习 见 day05/02_axios
#

 package.json:　记录的是npm安装的　配置大概的版本
 package-lock.json: 记录的是暗转的 配置真实版本

 # --------------------------- 商城 项目 训练 --------------------------
  ## 结构划分
  src
        common              // 放置一些公共的 js 文件. 常量、公共方法等.   
        components
            common          // 放一些公共组件，不仅这个项目可以用，别的项目也可以. 完全公共
            content         //  和 当前项目业务相关的 公共组件
            views           //  放置 主要视图 相关的 代码

 ### vue单文件中的this问题
    https://segmentfault.com/q/1010000011050559  

 ## 网络请求 获取的数据分散 的原因：
    原因在于服务器并不是只为我们的m站（移动端）服务，而且也要为Web\Aniord\Ios....服务。所以请求数据的结构是综合考虑的结果。
 ## bug 解释：
        1： Better-Scroll 组件，在一开始确定滚动区域高度时候，是根据scrollerHeight属性决定的。scrollerHeight是根据放在Better-scroll 中的 子组件的高度决定的。但是在计算scrollerHeight时候，图片如果没有全部加载完毕，此时计算出的可滚动高度就是错误的。图片加载完毕后，scrollerHeight没有进行更新，所以滚动出现了问题
        2： 此时如果继续使用的话，就有会导致无法真正滚动到页面底部就出发了上拉加载更多事件
  ### 解决办法
        1：如何监听图片加载完毕？
            原生js: img.onload = function(){}
            vue 中  : @load = 'xxx'
        2：调用Better-Scroll的refersh()函数

        3: goodsitem 想与 home.vue 通信（意味着 孙子 ---》 爷爷）
                方法： 1： 一层层的传递， $emit();  孙子-》父亲-》爷爷
                      2： 用 vuex 保存一个状态量。 一旦孙子改变就改变状态量。爷爷通过状态量监控

                      3： 用事件总线 的方式。（它不管理状态，而是管理事件的）
                            创建 总线： Vue.prototype.$bus = new Vue()
                            孙子： this.$bus.emit('xxx')
                            爷爷： this.$bus.$on('aaa',function fun_name(){})
                         取消事件总线： this.$bus.$off('事件名',fun_name).不仅要有 事件名，以及调用事件时候的钩子函数名
 #### 防抖 debounce 与  节流  throttle
         debounce(func,delay){
            var timer = null
            return function(...args){
                if(timer){
                clearTimeout(timer)
                }
                timer = setTimeout(()=>{
                func.apply(this,args)
                },delay)
            }
        }
   ### bug解决：  ------ 首页保持位置状态
        在我之前代码中 首先记录savyY的值，然后在 回到首页时候一次调用scrollTo与refresh方法， 会发生无法保持到原来
      位置，直接返回顶部的现象
        解决：
            方案一： 可能是版本的问题，我使用的better-scroll是1.15.2版本，换位以前的1.13.2版本就可以解决
            方案二： refresh 放到 scrllTo函数之前执行，也可以解决。
   ### bug解决： ----- 在 上拉加载更多的时候，往往一次上拉，就会响应多个pullingUp事件，
                所以此时，我是用debounce2来解决。 debounce2与 debounce  的区别在于，此时传递
                进去一个 that，以前版本中func.apply(this),this是一个undefined

                个人理解关于 this.$emit函数 使用debunce封装时候报错的原因：
                        原因在于这个函数 是this 也就是vue内部的函数，当 。。。。 理解还是有误，以后再追究吧。
                        暂时的解决办法是 用debunce2来代替。
                 

                 理解2： 关于 refresh = debunce(...)
                            refresh的调用可以使用this的理解。因为此时this的使用是在home.vue文件中，此时this就是
                            VUE实例。所以 个人觉得debunce 与 debunce3的差别并不大.
                最终理解：
                    在home.vue 与 scroll.vue 中，直接打印this.它们不同，this代表的是当前的组件。
                    至于 var x = this.$emit()
                        x('xxxxx')
                        会报错， 原因在于 webpack 使用严格模式，这导致 x 与 this失去双向绑定
                      导致x('xxx')直接调用时候，x中的this是undefined，所以报错_events of undefined
                    所以在 scroll.vue的create函数中直接利用debunce(this.$emit,300)的话，会导致this为Undefined，
                    导致报错。 所以要利用debunce2,传递进去一个this
 ### 吸顶 效果的实现
        1： 判断滚动到多少时候，需要出现吸顶效果   
            获取tab-control 的 offsettop 
                组件对象转DOM对象： 利用组件对象的.$el
            注意 获取 offsetTop时候，也要观察图片是否加载完毕，否则 得出的值不对，偏小
        2: 动态改变tab-control的样式时候，会出现两个问题：
            1：下面商品内容，会突然上移
            2： tabcontrol虽然设置了fixed,但是suizbetterscroll一起滚动出去了
     总结以上，新的实现方式是：
        1：在最上面多复制一分TabControl组件，利用它来实现停留效果
           当用户滚动到一定位置时候，tabControl显示出来
            当用户没有滚动一定位置时候该组件隐藏
  ### deatil.vue 里面 导航栏 互动实现（点击跳转到相应位置）    
        问题一： 该如何获取相应位置组件的offsetTop？
            1： 在 created中 使用 this.getoffsetTopY()；
                    失败， 根本不可以获取到元素，
            2： 在mounted 中也不行，数据还没有获取到
            3：在$nextTick中也不行。
                    此时 仅仅意味着是在DOM更新后获取，但此时 图片还没有加载完成，可能出现获取到的值不准确
            4： 在 图片加载完成后 获取
                    OK 注意防抖措施。

 ### 最后一个重点  关于 toast 组件的封装：
        $mountt 的作用是： 将组件进行挂载，因为只有挂载 过后，才可以关联DOM元素，
        https://cn.vuejs.org/v2/api/#vm-mount
        例子： 黑马_VUE/day02_基本语法组件/06_组件化的基本使用2.html
              黑马_VUE/商城例子/vue_Malls/src/components/common/toast/index.js
 ### nginx 在 linux 端 
    使用 yum install nginx 安装
    安装的位置在 etc/nginx 里面
# ---------------------------------
    jquery 的 height 与 width 指的就是 content-box
             outerwidth() 与 outerheight()  指的是 border-box     等价于 DOM 的 offsetwidth 与 offsetheight      outerwidth(true) 与 outerheight(true)  指的是 margin-box=》 包括 margin
    clientHeight、clientWidth→元素宽高（height+padding，不包含边框），可以理解为元素可视区域高度

  # 关于offsetTop的理解
        https://blog.csdn.net/jinxi1112/article/details/90692484




### 目前 关于 阿里云 项目部署情况：
    1： 相册项目：   801
    2：  商城（使用express 发布） 8081
    3:   商城（使用nginx发布）    8082

    关于 Linux 常用Nginx命令
            https://www.cnblogs.com/qutao125/p/10863028.html
            https://www.cnblogs.com/moy25/p/8668432.html：
                找出进程： netstat -nap | grep端口号
                杀死进程： kill -9 进程号
    关于 nginx 在linux下的分布情况：
            https://blog.csdn.net/iamniconico/article/details/80606396

    关于try_files 参数的理解：
            https://www.cnblogs.com/boundless-sky/p/9459775.html
            个人理解 和它一致：
                在商城（nginx）那个部署里面，当请求 /xxx 这种 不存在的地址时候，同样
            会重定向到/index页面，只是此时 由于我们自己vue代码写的问题，没有/xxx这个路由，所以只
            显示了一个底部的tabbar，上面是空的。上面只有是 router/index.js 里面包含的路由才能正常显示 
    
    未来必热：SVG Sprite技术介绍
            https://www.cnblogs.com/jiduoduo/p/6657576.html
    SVG 复用（defs、symbol、use）
            https://blog.csdn.net/chy555chy/article/details/53364561