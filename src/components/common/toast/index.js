import Toast from './toast.vue';

var obj = {}

obj.install=function(vue){
    var toast = vue.extend(Toast)
    var toastconstructor = new toast()
    // 将 组件进行 挂载，这样才有 $el 属性，
    // 10 行：模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
    toastconstructor.$mount()
    // toastconstructor.$mount(document.createElement('div'))
    document.body.appendChild(toastconstructor.$el)
    vue.prototype.$toast = toastconstructor
}

export default obj