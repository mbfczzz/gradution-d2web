<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
        <el-col :span="5">
                    <el-form-item label="奖惩名">
                        <el-input v-model="queryParameter.standardName" placeholder="请输入奖惩名"></el-input>
                    </el-form-item>
        </el-col>
        <el-col :span="5">
                    <el-form-item label="奖惩内容">
                        <el-input v-model="queryParameter.rewardContent" placeholder="请输入内容"></el-input>
                    </el-form-item>
        </el-col>  
        <el-col :span="5">
        <el-form-item label="奖惩描述" >
                    <el-select v-model="tmpStandardType" multiple placeholder="请选择" @change="rewardDescribeHandleChange">
                             <el-option
                                     v-for="item in  rewardDescribes"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
        </el-form-item>
        </el-col>  
        <el-col :span="5">
  <el-form-item label="规范类型" > 
                 <el-select v-model="tmpRewardDescribe" multiple placeholder="请选择" @change="standardTypeHandleChange">
                        <el-option
                            v-for="item in standardTypes"
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
                            active-text="是"
                            inactive-text="否">
                    </el-switch>
                    </el-form-item>
        </el-col>                                                                                  
        </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never"> 
        <el-col :span="7">
                 <el-form-item label="创建日期">
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
                 <el-form-item label="更新日期">
                        <el-date-picker
                            v-model="queryParameter.updateTime"
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
    props:['standardTypes','rewardDescribes'],
    data(){
        return{
            tmpStandardType:"",
            tmpRewardDescribe:"",
            queryParameter:{
            standardName:'',
            standardType:'',
            createTime:'',
            isValid:1,
            rewardContent:'',
            rewardDescribe:'',
            updateTime:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.standardName = '',
            this.queryParameter.standardType = '',
            this.queryParameter.createTime = '',
            this.queryParameter.isValid = 1,
            this.queryParameter.rewardContent = '',
            this.queryParameter.rewardDescribe = ''
            this.queryParameter.updateTime=''
            this.tmpStandardType =''
            this.tmpRewardDescribe =''

        },
      rewardDescribeHandleChange (data) {
          this.queryParameter.rewardDescribe = data.join(",")
      },
      standardTypeHandleChange (data) {
            this.queryParameter.standardType = data.join(",")
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>