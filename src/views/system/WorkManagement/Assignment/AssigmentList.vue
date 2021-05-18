<template>
     <div>
         <common-table :data="data" @resetPage="resetPage" @search='search' @reload='load'
         :statusNames="statusNames"
         :taskNames="taskNames"
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./Assigment/commonTable"
import api from "@/api"
export default {
    name:"Assigment",
    components:{
        commonTable
    },
    data(){
        return{
            statusNames:[],
            taskNames:[],
            data:{},
            page:1,
            limit:10,
            assigementTime:'',
            taskName:'',
            statusName:'',
            empName:''
        }
    },
    mounted() {
        this.load()
        this.getMapStatusName()
        this.getMapTaskNames()
    },
     methods:{
        show: async function(){
         const data  =  await api.ASSIGMENT_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 assigementTimeStr:this.assigementTime,
                 taskName:this.taskName,
                 statusName:this.statusName,
                 empName:this.empName,                
             }
             )
                 data.result.pageSize = this.limit
                 this.data = data.result
        },
        load:function () {
            this.show()   
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.show()
        },
        search:function(data){
            this.taskName = data.taskName
            this.statusName = data.statusName
            this.empName = data.empName
            if(data.assigementTime instanceof Array){
            this.assigementTime = data.assigementTime[0]+','+data.assigementTime[1]    
            }
            else{
                this.assigementTime =data.assigementTime
            }
            this.show()
        },
        getMapStatusName: async function () {
            const data  =  await api.GET_STATUS({
                type:"分配状态"
            })
            this.statusNames = data.result
        },
        getMapTaskNames: async function () {
            const data  =  await api.GET_TASK_ITEM()
            this.taskNames = data.result
        }                                                                                                                                                          
    }
}
</script>