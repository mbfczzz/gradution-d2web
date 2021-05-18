<template>
<el-form ref="userForm" :model="queryParameter" label-width="100px">
    <el-card shadow="never">
        <el-col :span="7">
                    <el-form-item label="源地址">
                            <el-cascader
                            size="large"
                            :options="options"
                            v-model="queryParameter.sourceAddr"
                            @change="sourceHandleChange">
                        </el-cascader>
                    </el-form-item>
        </el-col>
        <el-col :span="4">
                    <el-form-item label="目的地址">
                            <el-cascader
                            size="large"
                            :options="options"
                            v-model="queryParameter.destineAddr"
                            @change="destineHandleChange">
                        </el-cascader>
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
                         <el-select v-model="name" multiple placeholder="请选择" @change="change">
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
import { regionDataPlus } from 'element-china-area-data'
export default {
    name:"tablehead",
    props:['status'],
    data(){
        return{
            names:[],
            name:"",
            options: regionDataPlus,
            queryParameter:{
            sourceAddr:'',
            destineAddr:'',
            tranferTime:'',
            empName:'',
            transferReason:"",
            statusName:'',
            transferTime:""
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.sourceAddr = '',
            this.queryParameter.destineAddr = '',
            this.queryParameter.tranferTime = '',
            this.queryParameter.empName = '',
            this.queryParameter.statusName = ''
        },
        sourceHandleChange (data) {
          this.queryParameter.sourceAddr = data.join(",")
      },
        destineHandleChange (data) {
          this.queryParameter.destineAddr = data.join(",")
      },
        change:function(data) {
             this.queryParameter.statusName = data.join(",")
        }
    }      
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>