
import axios from 'axios'
export function request(config) {
    var inst4 = axios.create({
        // baseURL: 'http://123.207.32.32:8000/api/hy',
        baseURL: 'http://106.54.54.237:8000/api/hy',
        timeout: 5000
    })

    // 拦截请求
    inst4.interceptors.request.use((config)=>{
        return config            
    },err=>{
        // 请求失败
    });

    // 拦截响应
    inst4.interceptors.response.use(result=>{
        // 响应成功
       
        return result
    },err=>{
         console.log(err)
    })
    return inst4(config)
}
