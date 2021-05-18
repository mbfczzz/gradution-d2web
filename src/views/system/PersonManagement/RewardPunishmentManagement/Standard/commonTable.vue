<template>
        <el-container>  
             <el-header
             :height="height"
             >
                     <table-head 
                     ref="tableHead"
                     @search="search"
                     :standardTypes="standardTypes" 
                     :rewardDescribes="rewardDescribes"
                     ></table-head>
             </el-header>
             <el-main>
                     <table-main
                     :tdata="data" 
                     :standardTypes="standardTypes" 
                     :rewardDescribes="rewardDescribes"
                     @resetPage="resetPage" 
                     @reload='reload'
                     ></table-main>
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
        props:['data','standardTypes','rewardDescribes'],
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
                        return height
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