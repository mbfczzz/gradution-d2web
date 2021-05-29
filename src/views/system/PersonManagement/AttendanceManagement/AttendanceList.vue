<template>
     <div>
         <common-table
         :data="data" 
          @resetPage="resetPage"
          @search='search'
          @reload='load' 
         :agencyNames="agencyNames"    
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./AttendanceList/commonTable"
import api from "@/api"
export default {
    name:"AttendanceList",
    components:{
        commonTable
    },
    data(){
        return{
            agencyNames:[],            
            data:{},
            page:1,
            limit:10,
            attendanceTime:'',
            isCard:'',
            isAgency:'',
            isReplacement:'',
            oneCard:'',
            towCard:'',
            empName:'',
            agencyStr:''
        }
    },
    mounted() {
        this.load()
        this.getAgencyNames()
    },
     methods:{
        show: async function(){
         const data  =  await api.ATTENDANCE_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 attendanceTimeStr:this.attendanceTime,
                 isCard:this.isCard,
                 isAgency:this.isAgency,
                 isReplacement:this.isReplacement,
                 oneCardStr:this.oneCard,
                 towCardStr:this.towCard,
                 empName:this.empName,
                 agencyStr:this.agencyStr                        
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
            this.agencyStr = data.agencyStr
            this.isCard = data.isCard
            this.isAgency = data.isAgency
            this.isReplacement = data.isReplacement
            this.empName = data.empName
            if(data.attendanceTime instanceof Array){
            this.attendanceTime = data.attendanceTime[0]+','+data.attendanceTime[1]    
            }
            else{
                this.attendanceTime =data.attendanceTime
            }
            if(data.oneCard instanceof Array){
            this.oneCard = data.oneCard[0]+','+data.oneCard[1]    
            }
            else{
                this.oneCard =data.oneCard
            }
            if(data.towCard instanceof Array){
            this.towCard = data.towCard[0]+','+data.towCard[1]    
            }
            else{
                this.towCard =data.towCard
            }
            this.show()
        },
        getAgencyNames: async function () {
            const data  =  await api.GET_AGENCY_MAP()
             this.agencyNames = data.result
        }                                                                                                                                                     
    }
}
</script>