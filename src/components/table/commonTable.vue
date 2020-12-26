<template>
        <el-container>
             <el-header>
                     <table-head @search="search"></table-head>
             </el-header>
             <el-main>
                     <table-main :tdata="data" @resetPage="resetPage"></table-main>
             </el-main>
        </el-container>
</template>

<script>
import tableMain from '@/components/table/tableMain'
import tableHead from '@/components/table/tableHead'
export default {
        name:"commonTable",
        components:{
            tableMain,
            tableHead
        },
        props:['data'],
        data(){
             return{
 
             }   
        },
        methods:{
                resetPage:function(data){
                        this.$emit("resetPage",data)
                },
                search:function(data){
                        this.$emit('search',data)        
                }
        }
}
</script>

<style scoped>

</style>