<template>
     <div>
         <common-table :data="userData" @resetPage="resetPage" @search='search' :options="options" @reload='load'></common-table>
     </div>
</template>

<script>
import commonTable from "./UserList/commonTable"
import api from "@/api"
export default {
    name:"UserList",
    components:{
        commonTable
    },
    data(){
        return{
            options:[],
            userData:{},
            page:1,
            limit:10,
            username:'',
            isValid:'',
            userole:'',
            strDate:'',
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showUser: async function(){
         const data  =  await api.USER_SEARCH(
             {
                 page:this.page,
                 limit:this.limit,
                 username:this.username,
                 strDate:this.strDate,
                 isValid:this.isValid,
                 userole:this.userole
             }
             )
                 data.result.pageSize = this.limit
         this.userData = data.result
        },
        load:function () {
            this.showUser()
            this.getRole()    
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showUser()
        },
        search:function(data){
            this.username = data.username
            if(data.createTime instanceof Array){
            this.strDate = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.strDate =data.createTime
            }
            this.isValid = data.isValid
            this.userole = data.userole
            this.showUser()
        },
        getRole:async function(){
             const data  =  await api.USER_ROLE("")
             this.options = data.result
        },
    }
}
</script>