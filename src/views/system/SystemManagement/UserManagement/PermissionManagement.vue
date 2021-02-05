<template>
     <div>
         <common-table
         :data="userData" 
         @resetPage="resetPage" 
         @search='search' 
         :types="types"
         :permissions="permissions"
         :Hierarchys="Hierarchys" 
         @reload='load'></common-table>
     </div>
</template>

<script>
import commonTable from "./PermissionList/commonTable"
import api from "@/api"
export default {
    name:"Permission",
    components:{
        commonTable
    },
    data(){
        return{
            userData:{},
            types:[],
            Hierarchys:[],
            permissions:[],
            page:1,
            limit:10,
            permissionName:'',
            name:'',
            permissionUrl:"",
            permissionType:'',
            hierarchy:'',
            strDate:'',
            isValid:"",
            component:""
        }
    },
    mounted() {
        this.load()
    },
     methods:{
        showPermission: async function(){
         const data  =  await api.GET_ALL_PERMISSION(
             {
                 page:this.page,
                 limit:this.limit,
                 permissionName:this.permissionName,
                 strDate:this.strDate,
                 permissionType:this.permissionType,
                 hierarchy:this.hierarchy,
                 isValid:this.isValid,
                 name:this.name
             }
             )
                 data.result.pageSize = this.limit
         this.userData = data.result
        },
        load:function () {
            this.showPermission()
            this.getPermissionType()
            this.getHierarchy()
            this.getTreePermission()    
        },
        resetPage:function(data){
            this.page = data.page
            this.limit = data.limit
            this.showPermission()
        },
        search:function(data){
            console.log(123);
            this.name = data.name
            if(data.createTime instanceof Array){
            this.strDate = data.createTime[0]+','+data.createTime[1]    
            }
            else{
                this.strDate =data.createTime
            }
            this.isValid = data.isValid
            this.permissionName=data.permissionName
            this.name=data.name
            this.permissionType=data.permissionType
            this.hierarchy=data.hierarchy,
            this.showPermission()
        },
        getPermissionType:async function(){
             const data  =  await api.GET_PERMISSIONTYPE()
             this.types = data.result
        },
        getHierarchy:async function(){
             const data  =  await api.GET_HIERARCHY()
             this.Hierarchys = data.result
        },
        getTreePermission:async function(){
             const data  =  await api.TREE_PERMISSION()
             this.permissions = data.result
        },
    }
}
</script>