<template>
    <div class="category-subcontent" v-if="subcontent.length > 0">
        <div v-for="(item,index) in subcontent" :key="index" class="category-subcontent-item">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="category_sub_imgload">
            </a>
        </div>
    </div>
</template> 
<script>
export default {
    name:'TabContentCategory',
    props:{
        subcontent:{
            type:Array, 
            default(){
                return []
            }
        }
    },
    methods:{
        category_sub_imgload(){
            this.$emit('category_sub_imgload')
        }
    }
}
</script>
<style scoped>
.category-subcontent{
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.category-subcontent-item img{
    width: 80px;
}
</style>