<template>
     <div>
         <common-table
         :data="data" 
          @resetPage="resetPage"
          @search='search'
          @reload='load' 
         :positionNames="positionNames"
         :roleNames="roleNames"         
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./RecruitList/commonTable"
import api from "@/api"
export default {
    name:"RecruitList",
    components:{
        commonTable
    },
    data(){
        return{
            positionNames:[],
            roleNames:[],            
            data:{},
            page:1,
            limit:10,
            recruitContent:'',
            recruitName:'',
            recruitTime:'',
            empName:'',
            positionName:'',
            rules:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.RECRUIT_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 recruitContent:this.recruitContent,
                 recruitName:this.recruitName,
                 recruitTimeStr:this.recruitTime,
                 empName:this.empName,
                 positionName:this.positionName,
                 ruleStr:this.ruleStr                              
             }
             )
                 data.result.pageSize = this.limit
                 this.data = data.result
        },
        load:function () {
            this.show()   
            this.getRuleNames()
            this.getPositionNames()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.show()
        },
        search:function(data){
            this.recruitContent = data.recruitContent
            this.recruitName = data.recruitName
            this.empName = data.empName
            this.positionName = data.positionName
            this.ruleStr = data.ruleStr
            if(data.recruitTime instanceof Array){
            this.recruitTime = data.recruitTime[0]+','+data.recruitTime[1]    
            }
            else{
                this.recruitTime =data.recruitTime
            }
            this.show()
        },
        getRuleNames: async function () {
            const data  =  await api.GET_ROLENAMES()
             this.roleNames = data.result
        },
        getPositionNames: async function () {
            const data  =  await api.GET_POSITIONNAME()
            this.positionNames = data.result
        },                                                                                                                                                        
    }
}
</script>