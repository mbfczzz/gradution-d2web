<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="任务名">
                           <el-select v-model="tmptaskName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.taskName = data.join(',')">
                             <el-option
                                     v-for="item in  taskNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
            <el-col :span="4">
                    <el-form-item label="当前状态">
                           <el-select v-model="tmpstatusName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.statusName = data.join(',')">
                             <el-option
                                     v-for="item in  statusNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
         <el-col :span="4">
                    <el-form-item label="分配人">
                        <el-input v-model="queryParameter.empName" placeholder="请输入支出描述"></el-input>
                    </el-form-item>
           </el-col>        
        <el-col :span="7">
                 <el-form-item label="分配时间">
                        <el-date-picker
                            v-model="queryParameter.assigementTime"
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
        props:['statusNames','taskNames'],
    data(){
        return{
            tmptaskName:'',
            tmpstatusName:"",
            queryParameter:{
            assigementTime:'',
            taskName:'',
            statusName:'',
            empName:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.taskName = '',
            this.queryParameter.statusName = '',
            this.queryParameter.empName = '',
            this.queryParameter.assigementTime = ''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>