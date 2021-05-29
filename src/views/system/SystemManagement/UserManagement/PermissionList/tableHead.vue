<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">

        <el-row style="text-algin:center">
            <el-card shadow="never">
            <el-col :span="5">
                    <el-form-item label="权限名">
                        <el-input v-model="queryParameter.permissionName" placeholder="请输入权限名"></el-input>
                    </el-form-item>
          </el-col>
         <el-col :span="5">
                    <el-form-item label="组件名">
                        <el-input v-model="queryParameter.name" placeholder="请输入组件名"></el-input>
                    </el-form-item>
          </el-col>

        <el-col :span="5">
                    <el-form-item label="层级">
                        <el-select v-model="queryParameter.hierarchy" placeholder="请选择">
                                <el-option
                                    v-for="item in Hierarchys"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>       
                    </el-form-item>
         </el-col>

                 <el-col :span="5">
                    <el-form-item label="权限类型">
                               <el-select v-model="queryParameter.permissionType" placeholder="请选择">
                                    <el-option
                                        v-for="item in types"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                    </el-form-item>
         </el-col>

        <el-col :span="4">
            <el-form-item>
                    <el-switch
                            v-model="queryParameter.isValid"
                            :active-value=1
                            :inactive-value=0
                            active-text="可用"
                            inactive-text="不可用">
                    </el-switch>
            </el-form-item>
        </el-col>
            </el-card>
        </el-row>
        <el-row style="text-algin:center">
            <el-card shadow="never">
            <el-col :span="6">
                 <el-form-item label="创建时间">
                        <el-date-picker
                            v-model="queryParameter.createTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            clearable
                            >
                        </el-date-picker>
                </el-form-item>
        </el-col>
           <el-col :span="4">
               <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button @click="onReset">重置</el-button>
               </el-form-item>         
        </el-col>
            </el-card>
        </el-row>
        </el-form>
</template>

<script>
import api from '@/api'
export default {
    name:"tablehead",
    props:['types','permissions','Hierarchys'],
    data(){
        return{
            queryParameter:{
                permissionName:'',
                name:"",
                hierarchy:"",
                isValid:1,
                createTime:"",
                permissionType:""
            } 
        }
    },
    mounted(){

    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.permissionName=''
            this.queryParameter.isValid=1
            this.queryParameter.createTime=""
            this.queryParameter.name=''
            this.queryParameter.permissionType=''
            this.queryParameter.hierarchy=''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEEF5;;
    }
    .el-row{
        position: relative;
    }
</style>