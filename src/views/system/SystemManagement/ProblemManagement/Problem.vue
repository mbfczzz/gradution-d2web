<template>
     <div>
         <common-table :data="Data" @resetPage="resetPage" @reload="show"></common-table>
     </div>
</template>

<script>
import commonTable from "./ProblemList/commonTable"
import api from "@/api"
export default {
    name:"ProblemList",
    components:{
        commonTable
    },
    data(){
        return{
            Data:{},
            page:1,
            limit:10,
            problemModel:'',
            problemContent:'',
            isOk:'',
            createTime:'',
            addPeople:''
        }
    },
    mounted() {
        this.show()
    },
     methods:{
        show: async function(){
         const data  =  await api.PROBLEM_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 operator:this.operator,
                 operatorTime:this.operatorTime,
                 operatorTarget:this.operatorTarget,
                 operatorModel:this.operatorModel
             })
         data.result.pageSize = this.limit
         this.Data = data.result
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.show()
        }
    }
}
</script>