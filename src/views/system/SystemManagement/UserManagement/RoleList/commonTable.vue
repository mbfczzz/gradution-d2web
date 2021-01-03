<template>
        <el-container>
             <el-main>
                     <table-main :tdata="data" @resetPage="resetPage" :options="options" @reload='reload'></table-main>
             </el-main>
        </el-container>
</template>

<script>
import tableMain from './tableMain'
export default {
        name:"commonTable",
        components:{
            tableMain,
        },
        props:['data','options'],
        data(){
             return{
 
             }   
        },
        methods:{
                resetPage:function(data){
                        this.$emit("resetPage",data)
                },
                reload:function () {
                        this.$emit('reload')
                }
        }
}
</script>

<style scoped>

</style>