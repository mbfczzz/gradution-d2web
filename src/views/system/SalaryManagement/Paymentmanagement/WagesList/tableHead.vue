<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="收款方式">
                           <el-select v-model="tmpRefundWay" multiple placeholder="请选择" @change="(data)=>this.queryParameter.refundName = data.join(',')">
                             <el-option
                                     v-for="item in  refundWays"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
            <el-col :span="4">
                    <el-form-item label="工资账套">
                           <el-select v-model="tmpMoneyItem" multiple placeholder="请选择" @change="(data)=>this.queryParameter.accountName = data.join(',')">
                             <el-option
                                     v-for="item in  moneyItems"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="工资状态">
                          <el-select v-model="tmpStatusName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.statusName = data.join(',')">
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
                    <el-form-item label="员工名">
                        <el-input v-model="queryParameter.empName" placeholder="请输入支出人"></el-input>
                    </el-form-item>
           </el-col>
         <el-col :span="4">
                    <el-form-item label="员工工资">
                        <el-input v-model="queryParameter.empMoney" placeholder="请输入支出描述"></el-input>
                    </el-form-item>
           </el-col>
         <el-col :span="4">
                    <el-form-item label="工资描述">
                        <el-input v-model="queryParameter.moneyDescribe" placeholder="请输入支出描述"></el-input>
                    </el-form-item>
           </el-col>                  
        </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never">
        <el-col :span="7">
                 <el-form-item label="支出日期">
                        <el-date-picker
                            v-model="queryParameter.sendTime"
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
        props:['statusNames','refundWays','moneyItems'],
    data(){
        return{
            tmpStatusName:'',
            tmpRefundWay:"",
            tmpMoneyItem:'',
            queryParameter:{
            empName:'',
            empMoney:'',
            statusName:'',
            moneyDescribe:'',
            refundName:'',
            accountName:'',
            sendTime:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.empName = '',
            this.queryParameter.empMoney = '',
            this.queryParameter.statusName = '',
            this.queryParameter.moneyDescribe = '',
            this.queryParameter.refundName = '',
            this.queryParameter.accountName = ''
            this.queryParameter.sendTime = ''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>