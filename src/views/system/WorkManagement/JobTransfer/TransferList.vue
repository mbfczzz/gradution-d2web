<template>
     <div>
         <common-table :data="Data" @resetPage="resetPage" @search='search' 
         :status="status"  
         :destineDepartmentNames="destineDepartmentNames"
          @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./JobTransferList/commonTable"
import api from "@/api"
export default {
    name:"JobTransferList",
    components:{
        commonTable
    },
    data(){
        return{
            status:{},
            destineDepartmentNames:[],
            Data:{},
            page:1,
            limit:10,
            sourceDepartmentName:'',
            destineDepartmentName:'',
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
        show: async function(){
         const data  =  await api.JOBTRANSFER_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 sourceDepartmentName:this.sourceDepartmentName,
                 destineDepartmentName:this.destineDepartmentName,
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
            this.show()   
            this.getStatus()
            this.getMapDepartmentName()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showTransfer()
        },
        search:function(data){
            this.sourceDepartmentName = data.sourceDepartmentName
            this.destineDepartmentName = data.destineDepartmentName
            this.empName = data.empName
            this.transferReason =data.transferReason
            this.statusName = data.statusName
            if(data.transferTimeStr instanceof Array){
            this.transferTime = data.transferTimeStr[0]+','+data.transferTimeStr[1]    
            }
            else{
                this.transferTime =data.transferTimeStr
            }
            this.show()
        },
        getStatus:async function(){
               const data  =  await api.GET_STATUS(
             {
                    type:"员工调动"
             }
             )
                 this.status = data.result
        },
        getMapDepartmentName: async function () {
               const data  =  await api.GET_DEPARTMENTNAME()
                this.destineDepartmentNames = data.result
        }
    }
}
</script>