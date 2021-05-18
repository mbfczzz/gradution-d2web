<template>
     <div>
         <common-table :data="data" @resetPage="resetPage" @search='search' @reload='load'
         :statusNames="statusNames"
         :refundWays="refundWays"
         :moneyItems="moneyItems"
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./WagesList/commonTable"
import api from "@/api"
export default {
    name:"WagesList",
    components:{
        commonTable
    },
    data(){
        return{
            statusNames:[],
            refundWays:[],
            moneyItems:[],
            data:{},
            page:1,
            limit:10,
            empName:'',
            empMoney:'',
            statusName:'',
            moneyDescribe:'',
            refundName:'',
            accountName:'',
            sendTime:''
        }
    },
    mounted() {
        this.load()
        this.getMapStatusName()
        this.getMapRefundWay()
        this.getMapMoneyItem()
    },
     methods:{
        show: async function(){
         const data  =  await api.MONEY_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 empName:this.empName,
                 empMoney:this.empMoney,
                 moneyDescribe:this.moneyDescribe,
                 refundName:this.refundName,
                 accountName:this.accountName,                
                 sendTime:this.sendTime,
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
            this.empName = data.empName
            this.empMoney = data.empMoney
            this.moneyDescribe = data.moneyDescribe
            this.refundName = data.refundName
            this.accountName = data.accountName
            this.statusName = data.statusName
            if(data.sendTime instanceof Array){
            this.sendTime = data.sendTime[0]+','+data.sendTime[1]    
            }
            else{
                this.sendTime =data.sendTime
            }
            this.show()
        },
        getMapStatusName: async function () {
            const data  =  await api.GET_STATUS({
                type:"工资状态"
            })
            this.statusNames = data.result
        },
        getMapRefundWay: async function () {
            const data  =  await api.GET_REFUND_WAY()
            this.refundWays = data.result
        },
        getMapMoneyItem: async function () {
            const data  =  await api.GET_ACCOUNT_MAP()
            this.moneyItems = data.result
        }                                                                                                                                                            
    }
}
</script>