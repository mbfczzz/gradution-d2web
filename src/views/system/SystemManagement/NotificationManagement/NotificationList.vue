<template>
     <div>
         <common-table :data="notifyData" @resetPage="resetPage" @search='search' :options="options" @reload='load'></common-table>
     </div>
</template>

<script>
import commonTable from "./NotificationList/commonTable"
import api from "@/api"
export default {
    name:"NotificationList",
    components:{
        commonTable
    },
    data(){
        return{
            options:[],
            notifyData:{},
            page:1,
            limit:10,
            msgContent:'',
            sendWay:'',
            id:'',
            msgTitle:'',
            sendPeople:'',
            sourceId:'',
            subjectId:'',
            sendTime:''
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showNotify: async function(){
         const data  =  await api.NOTIFY_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 msgContent:this.msgContent,
                 sendWay:this.sendWay,
                 id:this.id,
                 msgTitle:this.msgTitle,
                 sendPeople:this.sendPeople,
                 sourceId:this.sourceId,
                 subjectId:this.subjectId,
                 sendTime:this.sendTime
             }
             )
                 data.result.pageSize = this.limit
                 this.notifyData = data.result
        },
        load:function () {
            this.showNotify()
            // this.getRole()    
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
        getNotify:async function(){
             const data  =  await api.USER_ROLE("")
             this.options = data.result
        },
    }
}
</script>