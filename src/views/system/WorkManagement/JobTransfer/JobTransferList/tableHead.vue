<template>
<el-form ref="userForm" :model="queryParameter" label-width="100px">
    <el-card shadow="never">
        <el-col :span="4">
                    <el-form-item label="源部门">
                       <el-select v-model="tmpsourceDepartmentName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.sourceDepartmentName = data.join(',')">
                            <el-option
                            v-for="item in destineDepartmentNames"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
        </el-col>
        <el-col :span="4">
                    <el-form-item label="目的部门">
                       <el-select v-model="tmpdestineDepartmentName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.destineDepartmentName = data.join(',')">
                            <el-option
                            v-for="item in destineDepartmentNames"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
        </el-col>          
        <el-col :span="4">
                    <el-form-item label="员工名">
                        <el-input v-model="queryParameter.empName" placeholder="请输入员工名"></el-input>
                    </el-form-item>
        </el-col> 
        <el-col :span="4">
                    <el-form-item label="调动原因">
                        <el-input v-model="queryParameter.transferReason" placeholder="请输入调动原因"></el-input>
                    </el-form-item>
        </el-col>         
        <el-col :span="4">
                    <el-form-item label="当前状态">
                         <el-select v-model="tmpstatusName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.statusName = data.join(',')">
                                    <el-option
                                        v-for="item in status"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                    </el-form-item>
        </el-col>
        <el-col :span="7">
                 <el-form-item label="创建日期">
                        <el-date-picker
                            v-model="queryParameter.transferTime"
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
</el-form>
</template>

<script>
export default {
    name:"tablehead",
    props:['status','destineDepartmentNames'],
    data(){
        return{
            tmpsourceDepartmentName:"",
            tmpdestineDepartmentName:'',
            tmpstatusName:'',
            queryParameter:{
            sourceDepartmentName:'',
            destineDepartmentName:'',
            tranferTime:'',
            empName:'',
            transferReason:"",
            statusName:'',
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.sourceDepartmentName = '',
            this.queryParameter.destineDepartmentName = '',
            this.queryParameter.tranferTime = '',
            this.queryParameter.transferReason = '',
            this.queryParameter.empName = ''
            this.queryParameter.statusName = ''
        }
    }      
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>