<template>
     <div>
         <common-table :data="data" @resetPage="resetPage"  @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./SalaryAccount/commonTable"
import api from "@/api"
export default {
    name:"SpendList",
    components:{
        commonTable
    },
    data(){
        return{
            data:{},
            page:1,
            limit:10,
            spendMoney:'',
            accountName:'',
            accountDescribe:'',
            isValid:'',
            createTime:'',
            updateTime:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.ACCOUNT_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 spendMoney:this.spendMoney,
                 accountName:this.accountName,
                 accountDescribe:this.accountDescribe,
                 isValid:this.isValid,
                 createTime:this.createTime,                
                 updateTime:this.updateTime
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
        }                                                                                                                                                     
    }
}
</script>