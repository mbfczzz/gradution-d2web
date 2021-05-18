<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
         <el-row>
            <el-col :span="4">
                    <el-form-item label="职位名">
                         <el-select v-model="name" multiple placeholder="请选择" @change="change">
                                    <el-option
                                        v-for="item in names"
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
export default {
    name:"tablehead",
    data(){
        return{
            name:[],
            queryParameter:{
            positionName:'', 
            createTime:"",
            isValid:'',
            } 
        }
    },
    props:["names"],
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.positionName = '',
            this.queryParameter.isValid = '',
            this.queryParameter.createTime = ''

        },
        change:function(data) {
             this.queryParameter.positionName = data.join(",")
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>