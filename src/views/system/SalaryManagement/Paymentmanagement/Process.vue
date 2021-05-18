<template>
     <div>
         <common-table :data="data" @resetPage="resetPage"  @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./RefundWay/commonTable"
import api from "@/api"
export default {
    name:"RefundWay",
    components:{
        commonTable
    },
    data(){
        return{
            data:{},
            page:1,
            limit:10,
            refundName:'',
            refundDescribe:'',
            isValid:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.REFUNDWAY_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 refundName:this.refundName,
                 refundDescribe:this.refundDescribe,
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