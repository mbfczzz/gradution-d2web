<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="支出项目">
                           <el-select v-model="tmpspendItem" multiple placeholder="请选择" @change="(data)=>this.queryParameter.itemName = data.join(',')">
                             <el-option
                                     v-for="item in  spendItems"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
            <el-col :span="4">
                    <el-form-item label="支出方式">
                           <el-select v-model="tmpspendWayName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.wayName = data.join(',')">
                             <el-option
                                     v-for="item in  spendWays"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
            <el-col :span="4">
                    <el-form-item label="支出人">
                        <el-input v-model="queryParameter.spendPeople" placeholder="请输入支出人"></el-input>
                    </el-form-item>
           </el-col>
         <el-col :span="4">
                    <el-form-item label="支出描述">
                        <el-input v-model="queryParameter.spendMark" placeholder="请输入支出描述"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="支出状态">
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
        </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never">
        <el-col :span="7">
                 <el-form-item label="支出日期">
                        <el-date-picker
                            v-model="queryParameter.spendTime"
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
        props:['statusNames','spendItems','spendWays'],
    data(){
        return{
            tmpspendItem:'',
            tmpstatusName:"",
            tmpspendWayName:'',
            queryParameter:{
            spendPeople:'',
            itemName:'',
            wayName:'',
            spendTime:'',
            spendMark:'',
            statusName:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.spendPeople = '',
            this.queryParameter.itemName = '',
            this.queryParameter.spendWayName = '',
            this.queryParameter.spendTime = '',
            this.queryParameter.spendMark = '',
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