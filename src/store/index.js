import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

var store = new vuex.Store({
    state:{
      cartList:[]
    },
    mutations:{
      addcounter(state,payload){
        payload.count +=1
      },
      addToCartList(state,payload){
        payload.count = 1
        payload.checked = true
        state.cartList.push(payload)
      },
      // 购物车栏目，  点击 选中/不选中 切换
      checkclick(state,payload){
        payload.checked = !payload.checked
      },
      // 全选
      all_checked(state){
          state.cartList.forEach(item=>{
              if(!item.checked){
                item.checked = true
              }
          })
      },
      // 全不选
      all_unchecked(state){
        state.cartList.forEach(item=>{
          if(item.checked){
            item.checked = false
          }
      })
      }
    },
    actions:{
      addCartList({state,commit},payload){
         /**
         *  做一个判断， 购物车里面是否有 同类商品，有的话:购物车里面相同类型的那件商品数量count加一
         *                                          无：新增商品(payload)的 count 赋值为1，并加入购物车。
         */ 
        var tmpproduct = null
        state.cartList.forEach(item=>{
            if(item.iid == payload.iid){
              tmpproduct = item
            }
        })
        if(tmpproduct){
          commit('addcounter',tmpproduct)
          return '当前商品数量+1'
        }else{
          commit('addToCartList',payload)
          return '添加了新的商品'
        }
      }

    },
    getters:{
      cartList_Length(state){
        return state.cartList.length
      },
      // 筛选 出 checked 为true的 元素
      checked_cartlist(state){
        return state.cartList.filter(item=>{
           return item.checked 
        })
      }
    },
    modules:{

    }
})

export default store