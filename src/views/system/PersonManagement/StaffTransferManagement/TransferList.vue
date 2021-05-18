<template>
     <div>
         <common-table :data="Data" @resetPage="resetPage" @search='search' :status="status" @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./TransferList/commonTable"
import api from "@/api"
export default {
    name:"TransferList",
    components:{
        commonTable
    },
    data(){
        return{
            empMap:{},
            status:{},
            Data:{},
            page:1,
            limit:10,
            sourceAddr:'',
            destineAddr:'',
            transferReason:'',
            empName:'',
            statusName:'',
            transferTime:"",
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showTransfer: async function(){
         const data  =  await api.TRANSFER_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 sourceAddr:this.sourceAddr,
                 destineAddr:this.destineAddr,
                 empName:this.empName,
                 transferReason:this.transferReason,
                 statusName:this.statusName,
                 transferTimeStr:this.transferTime,
             }
             )
                 data.result.pageSize = this.limit
                 this.Data = data.result
        },
        load:function () {
            this.showTransfer()   
            this.getStatus()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showTransfer()
        },
        search:function(data){
            this.sourceAddr = data.sourceAddr
            this.destineAddr = data.destineAddr
            this.empName = data.empName
            this.transferReason =data.transferReason
            this.statusName = data.statusName
            if(data.transferTimeStr instanceof Array){
            this.transferTime = data.transferTimeStr[0]+','+data.transferTimeStr[1]    
            }
            else{
                this.transferTime =data.transferTimeStr
            }
            this.showTransfer()
        },
        getStatus:async function(){
               const data  =  await api.GET_STATUS(
             {
                    type:"员工调动"
             }
             )
                 this.status = data.result
        },
        getMapEmpName: async function () {
               const data  =  await api.GET_MAPEMP_LIST()
                 this.empMap = data.result
        }
    }
}
</script>