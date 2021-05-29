<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="员工名">
                        <el-input v-model="queryParameter.empName" placeholder="请输入员工名"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="微信号">
                        <el-input v-model="queryParameter.empWx" placeholder="请输入微信号"></el-input>
                    </el-form-item>
           </el-col>          
        <el-col :span="4">
                    <el-form-item label="手机号">
                        <el-input v-model="queryParameter.empPhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
        </el-col> 
        <el-col :span="4">
                    <el-form-item label="邮箱">
                        <el-input v-model="queryParameter.empEmail" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
        </el-col> 
        
        <el-col :span="3">
                    <el-form-item>
                    <el-switch
                            v-model="queryParameter.isLeave"
                            :active-value=1
                            :inactive-value=0
                            active-text="是"
                            inactive-text="否">
                    </el-switch>
                    </el-form-item>
        </el-col>      

                <el-col :span="4">
                    <el-form-item label="地址">
                       <el-cascader
                            size="large"
                            :options="options"
                            v-model="queryParameter.empAddress"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
         </el-col>                                                                                 
        </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never">
        <el-col :span="7">
                 <el-form-item label="入职日期">
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
            <el-col :span="7">
                 <el-form-item label="离职日期">
                        <el-date-picker
                            v-model="queryParameter.leaveTime"
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
import { regionDataPlus } from 'element-china-area-data'
export default {
    name:"tablehead",
    data(){
        return{
            options: regionDataPlus,
            queryParameter:{
            empName:'',
            empAddress:'',
            empPhone:'',
            empWx:'',
            createTime:"",
            leaveTime:"",
            isLeave:'',
            empEmail:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.empEmail = '',
            this.queryParameter.empAddress = '',
            this.queryParameter.empPhone = '',
            this.queryParameter.empWx = '',
            this.queryParameter.empName = '',
            this.queryParameter.isLeave = '',
            this.queryParameter.createTime = ''
            this.queryParameter.leaveTime = ''

        },
        handleChange (data) {
          this.queryParameter.empAddress = data.join(",")
      }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>