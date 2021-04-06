<template>
        <el-container style="">  
             <el-header
             :height="height"
             >
                     <table-head 
                     ref="tableHead"
                     @search="search"
                     :types="types"
                     :permissions="permissions"
                     :Hierarchys="Hierarchys"
                     ></table-head>
             </el-header>
             <el-main>
                     <table-main
                     :tdata="data" 
                     @resetPage="resetPage" 
                     :types="types"
                     :permissions="permissions"
                     :Hierarchys="Hierarchys"  
                     @reload='reload'></table-main>
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
        props:['data','types','permissions','Hierarchys'],
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