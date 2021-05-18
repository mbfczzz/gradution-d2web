<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
         <el-col :span="4">
                    <el-form-item label="招聘内容">
                        <el-input v-model="queryParameter.recruitContent" placeholder="请输入招聘内容"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="招聘标题">
                        <el-input v-model="queryParameter.recruitName" placeholder="请输入招聘标题"></el-input>
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
             <el-form-item label="要求">
                    <el-select v-model="tmpruleName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.ruleStr = data.join(',')">
                             <el-option
                                     v-for="item in  roleNames"
                                     :key="item.key"
                                     :label="item.label"
                                     :value="item.key">
                                     </el-option>
                    </el-select>
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
    props:['positionNames','roleNames'],    
    data(){
        return{
            tmpPositionName:'',
            tmpruleName:"",
            queryParameter:{
            recruitContent:'',
            recruitName:'',
            empName:'',
            positionName:'',
            ruleStr:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.recruitContent = '',
            this.queryParameter.recruitName = '',
            this.queryParameter.empName = '',
            this.queryParameter.positionName = '',
            this.queryParameter.ruleStr = ''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>