<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="奖惩内容">
                        <el-input v-model="queryParameter.rewardContent" placeholder="请输入奖惩内容"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="员工名">
                        <el-input v-model="queryParameter.empName" placeholder="请输入员工名"></el-input>
                    </el-form-item>
           </el-col>          
        <el-col :span="4">
             <el-form-item label="职位名">
                    <el-select v-model="tmpPositionName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.positionName = data.join(',')">
                             <el-option
                                     v-for="item in  positionNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
             </el-form-item>
        </el-col> 
        <el-col :span="4">
             <el-form-item label="部门名">
                    <el-select v-model="tmpdepartmentName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.departmentName = data.join(',')">
                             <el-option
                                     v-for="item in  departmentNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
             </el-form-item>
        </el-col> 
        <el-col :span="4">
                    <el-form-item label="手机号">
                        <el-input v-model="queryParameter.empPhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
        </el-col> 
        <el-col :span="4">
             <el-form-item label="奖惩名">
                    <el-select v-model="tmpstandardName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.standardName = data.join(',')">
                             <el-option
                                     v-for="item in  standardNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
             </el-form-item>
        </el-col>        

        </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never">
        <el-col :span="7">
                 <el-form-item label="奖惩日期">
                        <el-date-picker
                            v-model="queryParameter.rewardTime"
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
export default {
    name:"tablehead",
    props:['positionNames','departmentNames','standardNames'],    
    data(){
        return{
            tmpPositionName:'',
            tmpdepartmentName:"",
            tmpstandardName:'',
            queryParameter:{
            rewardTime:'',
            rewardContent:'',
            empName:'',
            positionName:'',
            empPhone:"",
            departmentName:"",
            standardName:"",
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.rewardTime = '',
            this.queryParameter.rewardContent = '',
            this.queryParameter.empName = '',
            this.queryParameter.positionName = '',
            this.queryParameter.empPhone = '',
            this.queryParameter.standardName = '',
            this.queryParameter.departmentName = ''
            this.tmpPositionName=""
            this.tmpstandardName=''
            this.tmpstandardName=''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>