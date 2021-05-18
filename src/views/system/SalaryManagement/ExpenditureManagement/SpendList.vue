<template>
     <div>
         <common-table :data="data" @resetPage="resetPage" @search='search' @reload='load'
         :statusNames="statusNames"
         :spendWays="spendWays"
         :spendItems="spendItems"
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./SpendList/commonTable"
import api from "@/api"
export default {
    name:"SpendList",
    components:{
        commonTable
    },
    data(){
        return{
            statusNames:[],
            spendWays:[],
            spendItems:[],
            data:{},
            page:1,
            limit:10,
            spendPeople:'',
            itemName:'',
            wayName:'',
            spendTime:'',
            spendMark:'',
            statusName:''
        }
    },
    mounted() {
        this.load()
        this.getMapStatusName()
        this.getMapSpendItem()
        this.getMapSpendWay()
    },
     methods:{
        show: async function(){
         const data  =  await api.EXPENDITURE_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 spendPeople:this.spendPeople,
                 itemName:this.itemName,
                 wayName:this.wayName,
                 spendTimeStr:this.spendTime,
                 spendMark:this.spendMark,                
                 statusName:this.statusName
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
            this.spendPeople = data.spendPeople
            this.itemName = data.itemName
            this.wayName = data.wayName
            this.spendMark = data.spendMark
            this.statusName = data.statusName
            if(data.spendTime instanceof Array){
            this.spendTime = data.spendTime[0]+','+data.spendTime[1]    
            }
            else{
                this.spendTime =data.spendTime
            }
            this.show()
        },
        getMapStatusName: async function () {
            const data  =  await api.GET_STATUS({
                type:"支出状态"
            })
            this.statusNames = data.result
        },
        getMapSpendItem: async function () {
            const data  =  await api.GET_SPEND_ITEM()
            this.spendItems = data.result
        },
        getMapSpendWay: async function () {
            const data  =  await api.GET_SPEND_WAY()
            this.spendWays = data.result
        }                                                                                                                                                            
    }
}
</script>