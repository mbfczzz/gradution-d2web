<template>
     <div>
         <common-table :data="data" :standardTypes="standardTypes" :rewardDescribes="rewardDescribes" @resetPage="resetPage" @search='search' @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./Standard/commonTable"
import api from "@/api"
export default {
    name:"Standard",
    components:{
        commonTable
    },
    data(){
        return{ 
            standardTypes:[],
            rewardDescribes:[],
            data:[],
            page:1,
            limit:10,
            standardName:'',
            standardType:'',
            createTime:'',
            updateTime:'',
            isValid:"",
            rewardContent:'',
            rewardDescribe:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showStandard: async function(){
         const data  =  await api.STANDARD_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 standardName:this.standardName,
                 standardType:this.standardType,
                 createTimeStr:this.createTime,
                 updateTimeStr:this.updateTime,
                 isValid:this.isValid,
                 rewardContent:this.rewardContent,
                 rewardDescribe:this.rewardDescribe
             }
             )
                 data.result.pageSize = this.limit
                 this.data = data.result
        },
        load:function () {
            this.showStandard()   
            this.getStandardType()
            this.getStandardDescribe()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showStandard()
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
            this.showStandard()
        },    
        getStandardType: async function(){
                 const data  =  await api.GET_STANDARD_TYPE()
                 this.standardTypes = data.result
        },
        getStandardDescribe: async function(){
               const data  =  await api.GET_STANDARD_DESCRIBE()
               this.rewardDescribes = data.result
        }
    }
}
</script>