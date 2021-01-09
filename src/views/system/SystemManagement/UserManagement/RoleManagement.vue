<template>
     <div>
         <common-table :data="userData" @resetPage="resetPage" :options="options" @reload='load'></common-table>
     </div>
</template>

<script>
import commonTable from "./RoleList/commonTable"
import api from "@/api"
export default {
    name:"RoleManagement",
    components:{
        commonTable
    },
    data(){
        return{
            options:[],
            userData:{},
            page:1,
            limit:10,
        }
    },
    mounted() {
        this.load()
    },
     methods:{
         showRole: async function(){
         const data  =  await api.GET_ALL_ROLE(
             {
                 page:this.page,
                 limit:this.limit
             }
             )
                 data.result.pageSize = this.limit
         this.userData = data.result
        },
        load:function () {
            this.showRole()
            this.getPermission()    
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showRole()
        },
        getPermission:async function(){
             const data  =  await api.TREE_PERMISSION()
             this.options = data.result
        },
    }
}
</script>