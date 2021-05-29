<template>
     <div>
         <common-table :data="Data" :names="names" @resetPage="resetPage" @search='search' @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./DepartmentManagement/commonTable"
import api from "@/api"
export default {
    name:"DeparmentManagement",
    components:{
        commonTable
    },
    data(){
        return{
            Data:{},
            names:[],
            page:1,
            limit:10,
            departmentName:'',
            departmentMark:'',
            createTime:"",
            isValid:""
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.DEPARTMENT_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 departmentName:this.departmentName,
                 departmentMark:this.departmentMark,
                 createTimeStr:this.createTime,
                 isValid:this.isValid
             }
             )
                 data.result.pageSize = this.limit
                 this.Data = data.result
                 console.log(this.data);
        },
        getDepartmentName: async function(){
                const res = await api.GET_DEPARTMENTNAME();
                this.names = res.result
        },
        load:function () {
            this.show()   
            this.getDepartmentName()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.show()
        },
        search:function(data){
            this.departmentName = data.departmentName
            this.departmentMark = data.departmentMark
            this.isValid = data.isValid
            if(data.createTime instanceof Array){
            this.createTime = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.createTime =data.createTime
            }
            this.show()
        },                                                                                                                                    
    }
}
</script>