<template>
        <el-container>  
             <el-main>
                     <table-main
                     :tdata="data" 
                     :msgSources="msgSources"
                     :sendSubjects="sendSubjects"
                     :sendWays="sendWays"
                     @resetPage="resetPage" 
                     @reload='reload'
                     ></table-main>
             </el-main>
        </el-container>
</template>

<script>
import tableMain from './tableMain'
export default {
        name:"commonTable",
        components:{
            tableMain
        },
        props:['data','msgSources','sendSubjects','sendWays'],
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
                },
                reload:function () {
                        this.$emit('reload')
                }
        }
}
</script>

<style scoped>

</style>