<template>
     <div>
         <common-table :data="data" @resetPage="resetPage"  @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./PaymentWay/commonTable"
import api from "@/api"
export default {
    name:"SpendWay",
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
            wayName:"",
            wayDescribe:"",
            isValid:""
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.SPENDWAY_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 wayName:this.wayName,
                 wayDescribe:this.wayDescribe,
                 isValid:this.isValid      
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