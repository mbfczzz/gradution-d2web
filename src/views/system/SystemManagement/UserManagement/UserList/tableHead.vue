<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
        <el-row style="text-algin:center">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="用户名">
                        <el-input v-model="queryParameter.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
            </el-col>

            <el-col :span="4">
                    <el-form-item label="用户角色">
                       <el-select v-model="role" multiple placeholder="请选择" @change="change">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
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
                            active-text="可用"
                            inactive-text="不可用">
                    </el-switch>
                    </el-form-item>
            </el-col>

            <el-col :span="8">
                 <el-form-item label="创建时间">
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
    props:['options'],
    data(){
        return{
            role:'',
            queryParameter:{
                username:'',
                isValid:1,
                createTime:"",
                userole:""
            } 
        }
    },
    mounted(){

    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.role =''
            this.queryParameter.username=''
            this.queryParameter.isValid=1
            this.queryParameter.createTime=""
            this.queryParameter.userole=''
        },
        change:function(data) {
             this.queryParameter.userole = data.join(",")
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEEF5;;
    }
</style>