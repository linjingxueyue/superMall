import BackTop from "components/content/backtop/BackTop.vue";

export const back_top = {
    components:{
        BackTop
    },
    data(){
        return {
            isshow_backtop:false
        }
    },
    methods:{
        backtopclick() {
            this.$refs.scroll.scrollTo(0, 0);
            console.log("backtopclick click");
          },
    }
}