<template>
    <el-form ref="userForm" :model="queryParameter" label-width="100px">
            <el-card shadow="never">  
         <el-row>            
         <el-col :span="4">
                    <el-form-item label="员工名">
                        <el-input v-model="queryParameter.empName" placeholder="请输入员工名"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="5">
                    <el-form-item label="考勤时间">
                        <el-date-picker
                            v-model="queryParameter.attendanceTime"
                            type="date"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            clearable
                            >
                        </el-date-picker>
                    </el-form-item>
           </el-col>    
           <el-col :span="8">
                    <el-form-item label="一次打卡">
                   <el-date-picker
                    v-model="queryParameter.oneCard"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    value-format="yyyy-MM-dd HH:mm:ss"                    
                    end-placeholder="结束日期">
                    </el-date-picker>                        
                    </el-form-item>
           </el-col>
           <el-col :span="3">
                    <el-form-item label="是否打卡">
                <el-switch
                    :active-value=1
                    :inactive-value=0
                    v-model="queryParameter.isCard">
                </el-switch>   
                    </el-form-item>
           </el-col>
           <el-col :span="3">
                    <el-form-item label="是否补卡">
                <el-switch
                    :active-value=1
                    :inactive-value=0
                    v-model="queryParameter.isAgency">
                </el-switch>   
                    </el-form-item>
           </el-col>                               
         </el-row>         
         <el-row>                  
        <el-col :span="8">
             <el-form-item label="二次打卡">
                   <el-date-picker
                    v-model="queryParameter.towCard"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    value-format="yyyy-MM-dd HH:mm:ss"                    
                    end-placeholder="结束日期">
                    </el-date-picker>
             </el-form-item>
        </el-col>
        <el-col :span="4">
                    <el-form-item label="是否完成待办">
                <el-switch
                    :active-value=1
                    :inactive-value=0
                    v-model="queryParameter.isReplacement">
                </el-switch>   
                    </el-form-item>
           </el-col>          
        <el-col :span="5">
             <el-form-item label="待办">
                    <el-select v-model="tmpagencyName" multiple placeholder="请选择" @change="(data)=>this.queryParameter.agencyStr = data.join(',')">
                             <el-option
                                     v-for="item in  agencyNames"
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
         </el-row>
            </el-card>
        </el-form>
</template>

<script>
import {getTime} from '@/utils/index'
export default {
    name:"tablehead",
    props:['agencyNames'],    
    data(){
        return{
            tmpagencyName:'',
            queryParameter:{
            attendanceTime:getTime(),
            oneCard:[getTime(),new Date(getTime().setDate(getTime().getDate()+1))],
            isCard:1,
            isAgency:1,
            isReplacement:1,            
            towCard:[getTime(),new Date(getTime().setDate(getTime().getDate()+1))],
            empName:'',
            agencyStr:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.tmpagencyName = '',
            this.queryParameter.attendanceTime = '',
            this.queryParameter.oneCard = '',
            this.queryParameter.towCard = '',
            this.queryParameter.empName = '',
            this.queryParameter.agencyStr = ''            
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>