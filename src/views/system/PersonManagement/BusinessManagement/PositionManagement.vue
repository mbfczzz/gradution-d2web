<template>
     <div>
         <common-table :data="Data" :names="names" @resetPage="resetPage" @search='search' @reload='load'
         ></common-table>
     </div>
</template>

<script>
import commonTable from "./PositionManagement/commonTable"
import api from "@/api"
export default {
    name:"PositionManagement",
    components:{
        commonTable
    },
    data(){
        return{
            Data:{},
            names:[],
            page:1,
            limit:10,
            positionName:'',
            isValid:"",
            createTime:""
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        show: async function(){
         const data  =  await api.POSITION_LIST(
             {
                 page:this.page,
                 limit:this.limit,
                 positionName:this.positionName,
                 isValid:this.isValid,
                 createTimeStr:this.createTime
             }
             )
                 data.result.pageSize = this.limit
                 this.Data = data.result
                 console.log(this.data);
        },
        getPositiontName: async function(){
                const res = await api.GET_POSITIONNAME();
                this.names = res.result
        },
        load:function () {
            this.show()   
            this.getPositiontName()
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.show()
        },
        search:function(data){
            this.positionName = data.positionName
            this.isValid = data.isValid
            if(data.createTime instanceof Array){
            this.createTime = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.createTime =data.createTime
            }
            this.show()
        },                                                                                                                                    
    }
}
</script>