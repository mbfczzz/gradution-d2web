<template>
     <div>
         <common-table :data="data" @resetPage="resetPage" @search='search' @reload='load'
                    :positionNames="positionNames"
                    :departmentNames="departmentNames"
                    :standardNames="standardNames"     
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./RewardList/commonTable"
import api from "@/api"
export default {
    name:"RewardList",
    components:{
        commonTable
    },
    data(){
        return{
            positionNames:[],
            departmentNames:[],
            standardNames:[],
            data:{},
            page:1,
            limit:10,
            standardName:'',
            standardType:'',
            createTime:'',
            isValid:'',
            rewardContent:'',
            rewardDescribe:'',
            updateTime:''
        }
    },
    mounted() {
        this.load()
        this.getPositionNames()
        this.getDepartmentNames()
        this.getStandardNames()
    },
     methods:{
        show: async function(){
         const data  =  await api.REWARDS_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 standardName:this.standardName,
                 standardType:this.standardType,
                 createTimeStr:this.createTimeStr,
                 isValid:this.isValid,
                 rewardContent:this.rewardContent,                
                 rewardDescribe:this.rewardDescribe,
                 updateTimeStr:this.updateTime                 
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
            this.standardName = data.standardName
            this.standardType = data.standardType
            this.isValid = data.isValid
            this.rewardContent = data.rewardContent
            this.rewardDescribe = data.rewardDescribe
            if(data.createTime instanceof Array){
            this.createTime = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.createTime =data.createTime
            }
            if(data.updateTime instanceof Array){
            this.updateTime = data.updateTime[0]+','+data.updateTime[1]    
            }
            else{
                this.updateTime =data.updateTime
            }
            this.show()
        },
        getPositionNames: async function () {
            const data  =  await api.GET_POSITIONNAME()
            this.positionNames = data.result
        },
        getDepartmentNames: async function () {
            const data  =  await api.GET_DEPARTMENTNAME()
            this.departmentNames = data.result
        },
        getStandardNames: async function () {
            const data  =  await api.GET_STANDARD_NAME()
            this.standardNames = data.result
        }                                                                                                                                                            
    }
}
</script>