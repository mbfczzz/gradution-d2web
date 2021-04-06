<template>
        <el-container>
             <el-header :height="height">
                     <table-head @search="search" ref="tableHead" :options="options"></table-head>
             </el-header>
             <el-main>
                     <table-main :tdata="data" @resetPage="resetPage" :options="options" @reload='reload'></table-main>
             </el-main>
        </el-container>
</template>

<script>
import tableMain from './tableMain'
import tableHead from './tableHead'
export default {
        name:"commonTable",
        components:{
            tableMain,
            tableHead
        },
        props:['data','options'],
          data(){
             return{
                height:""
             }   
        },
        mounted(){
                let height = this.$refs.tableHead.$el.offsetHeight;
                this.$watch(
                function() {
                        this.height = height.toString()
                },
                );
        },
        methods:{
                resetPage:function(data){
                        this.$emit("resetPage",data)
                },
                search:function(data){
                        this.$emit('search',data)        
                },
                reload:function () {
                        this.$emit('reload')
                }
        }
}
</script>

<style scoped>

</style>