<template>
     <div>
         <common-table :data="notifyData" @resetPage="resetPage" @search='search' @reload='load'
         :msgSources="msgSources"
         :sendSubjects="sendSubjects"
         :sendWays="sendWays"
         ></common-table>
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
            msgSources:[],
            sendSubjects:[],
            sendWays:[],
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
                 msgTitle:this.msgTitle,
                 sourceId:this.sourceId,
                 sendPeople:this.sendPeople,
                 subjectId:this.subjectId,
                 sendWay:this.sendWay,
                 sendTime:this.sendTime
             }
             )
                 data.result.pageSize = this.limit
                 this.notifyData = data.result
        },
        load:function () {
            this.showNotify()   
            this.getAllSource()
            this.getAllSubject()
            this.getAllWay()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showNotify()
        },
        search:function(data){
            this.msgContent = data.msgContent
            this.msgTitle = data.msgTitle
            this.sourceId = data.sourceId
            this.subjectId = data.subjectId
            this.sendWay = data.sendWay
            this.sendPeople = data.sendPeople
            if(data.sendTime instanceof Array){
            this.sendTime = data.sendTime[0]+','+data.sendTime[1]    
            }
            else{
                this.sendTime =data.sendTime
            }
            this.showNotify()
        },
        getAllSource:async function(){
             const data  =  await api.GET_ALL_SOURCE("")
             this.msgSources = data.result
        },
        getAllSubject:async function(){
             const data  =  await api.GET_ALL_SUBJECT("")
             this.sendSubjects = data.result
        },
        getAllWay:async function(){
             const data  =  await api.SEND_WAY("")
             this.sendWays = data.result
        },                                                                                                                                       
    }
}
</script>