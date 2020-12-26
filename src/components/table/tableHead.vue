<template>
    <el-form ref="logForm" :model="queryParameter" label-width="80px">
        <el-row style="text-algin:center">
            <el-col :span="4">
                <el-card shadow="never">
                    <el-form-item label="操作人">
                        <el-input v-model="queryParameter.operator" placeholder="请输入操作人"></el-input>
                    </el-form-item>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card shadow="never">
                    <el-form-item label="操作模块">
                        <el-input v-model="queryParameter.operatorModel" placeholder="请输入操作模块"></el-input>
                    </el-form-item>
                </el-card>
        </el-col>

            <el-col :span="4">
                <el-card shadow="never">
                    <el-form-item label="操作目的">
                        <el-input v-model="queryParameter.operatorTarget" placeholder="请输入操作目的"></el-input>
                    </el-form-item>
                </el-card>
            </el-col>


        <el-col :span="8">
            <el-card shadow="never">
                 <el-form-item label="操作时间">
                        <el-date-picker
                            v-model="queryParameter.operatorTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            clearable
                            >
                        </el-date-picker>
                </el-form-item>
            </el-card>
        </el-col>

        <el-col :span="4">
            <el-card shadow="never">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button @click="onReset">重置</el-button>
            </el-card>
        </el-col>
        </el-row>
        </el-form>
</template>

<script>
export default {
    name:"tablehead",
    data(){
        return{
            queryParameter:{
                operator:'',
                operatorTime:'',
                operatorTarget:'',
                operatorModel:''
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.requestUri=''
            this.queryParameter.operator=''
            this.queryParameter.operatorTime=''
            this.queryParameter.operatorTarget=''
            this.queryParameter.operatorModel=''
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEEF5;;
    }
    .el-form-item__content{
        margin-left: 20px;
    }
</style>