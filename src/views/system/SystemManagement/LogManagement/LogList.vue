<template>
     <div>
         <common-table :data="LogData" @resetPage="resetPage" @search='search'></common-table>
     </div>
</template>

<script>
import commonTable from "@/components/table/commonTable"
import api from "@/api"
import log from '@/libs/util.log'
export default {
    name:"LogList",
    components:{
        commonTable
    },
    data(){
        return{
            LogData:{},
            page:1,
            limit:10,
            operator:'',
            operatorTime:'',
            operatorTarget:'',
            operatorModel:''
        }
    },
    mounted() {
        this.showLog()
    },
     methods:{
        showLog: async function(){
         const data  =  await api.LOG_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 operator:this.operator,
                 operatorTime:this.operatorTime,
                 operatorTarget:this.operatorTarget,
                 operatorModel:this.operatorModel
             }
             )
         this.LogData = data.result
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showLog()
        },
        search:function(data){
            this.operator = data.operator
            if(data.operatorTime instanceof Array){
            this.operatorTime = data.operatorTime[0]+','+data.operatorTime[1]    
            }
            else{
                this.operatorTime =data.operatorTime
            }
            this.operatorTarget = data.operatorTarget
            this.operatorModel = data.operatorModel
            this.showLog()
        }
    }
}
</script>