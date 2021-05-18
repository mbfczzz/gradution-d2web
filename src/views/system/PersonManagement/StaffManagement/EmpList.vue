<template>
     <div>
         <common-table :data="empData" @resetPage="resetPage" @search='search' @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./EmpList/commonTable"
import api from "@/api"
export default {
    name:"EmpList",
    components:{
        commonTable
    },
    data(){
        return{
            msgSources:[],
            sendSubjects:[],
            sendWays:[],
            empData:{},
            page:1,
            limit:10,
            empName:'',
            empAddress:'',
            empPhone:'',
            empWx:'',
            createTime:"",
            updateTime:"",
            leaveTime:"",
            isLeave:'',
            empEmail:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showEmp: async function(){
         const data  =  await api.EMP_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 empName:this.empName,
                 empAddress:this.empAddress,
                 empPhone:this.empPhone,
                 empWx:this.empWx,
                 createTimeStr:this.createTime,
                 updateTimeStr:this.updateTime,
                 leaveTimeStr:this.leaveTime,
                 isLeave:this.isLeave,
                 empName:this.empName
             }
             )
                 data.result.pageSize = this.limit
                 this.empData = data.result
        },
        load:function () {
            this.showEmp()   
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showEmp()
        },
        search:function(data){
            this.empName = data.empName
            this.empAddress = data.empAddress
            this.empPhone = data.empPhone
            this.empWx = data.empWx
            this.empEmail = data.empEmail
            this.isLeave = data.isLeave
            if(data.createTime instanceof Array){
            this.createTime = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.createTime =data.createTime
            }
            if(data.leaveTime instanceof Array){
            this.leaveTime = data.leaveTime[0]+','+data.leaveTime[1]    
            }
            else{
                this.leaveTime =data.leaveTime
            }
            this.showEmp()
        },                                                                                                                                    
    }
}
</script>