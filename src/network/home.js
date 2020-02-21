import {request} from './request.js'


export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

// 默认 先请求第一页 数据 
export function getHomeGoods(type,page){
    return request({
        url:'home/data',
        params:{
            type,
            page
        }
    })
}