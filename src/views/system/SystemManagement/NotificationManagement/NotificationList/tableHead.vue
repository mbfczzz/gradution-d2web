<template>
    <el-form ref="userForm" :model="queryParameter" label-width="80px">
            <el-card shadow="never">
            <el-col :span="4">
                    <el-form-item label="消息名">
                        <el-input v-model="queryParameter.msgTitle" placeholder="请输入消息名"></el-input>
                    </el-form-item>
           </el-col>
           <el-col :span="4">
                    <el-form-item label="消息内容">
                        <el-input v-model="queryParameter.msgContent" placeholder="请输入消息内容"></el-input>
                    </el-form-item>
           </el-col>                                                                                                                                                        

        <el-col :span="4">
                    <el-form-item label="事件来源">
                        <el-select v-model="tmpSourceId" multiple placeholder="请选择事件来源" @change="sourceIdChange">
                                <el-option
                                    v-for="item in msgSources"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                        </el-select>       
                    </el-form-item>
         </el-col>

        <el-col :span="4">
                    <el-form-item label="事件主体">
                        <el-select v-model="tmpSubject" multiple placeholder="请选择事件主体" @change="subjectIdChange">
                                <el-option
                                    v-for="item in sendSubjects"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                        </el-select>       
                    </el-form-item>
         </el-col>
        <el-col :span="4">
                    <el-form-item label="发送方式">
                        <el-select v-model="tmpSendWay" multiple placeholder="请选择发送方式" @change="sendWayChange">
                                <el-option
                                    v-for="item in sendWays"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                        </el-select>       
                    </el-form-item>
         </el-col>

         <el-col :span="4">
                    <el-form-item label="发送人">
                        <el-input v-model="queryParameter.sendPeople" placeholder="请输入发送人"></el-input>
                    </el-form-item>
          </el-col>
            </el-card>
        <el-row style="text-algin:center">
            <el-card shadow="never">
            <el-col :span="6">
                 <el-form-item label="发送日期">
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
    props:['msgSources','sendSubjects','sendWays'],
    data(){
        return{
            tmpSubject:'',
            tmpSourceId:'',
            tmpSendWay:'',
            queryParameter:{
            msgTitle:'',
            sourceId:'',
            subjectId:'',
            sendTime:'',
            msgContent:"",
            sendWay:"",
            sendPeople:"",
            } 
        }
    },
    methods:{
        onSubmit:function(){
            this.$emit('search',this.queryParameter)
        },
        onReset:function(){
            this.queryParameter.msgTitle = '',
            this.queryParameter.msgContent = '',
            this.queryParameter.sourceId = '',
            this.queryParameter.subjectId = '',
            this.queryParameter.sendWay = '',
            this.queryParameter.sendPeople = '',
            this.queryParameter.sendTime = ''
            this.tmpSubject=''
            this.tmpSourceId=''
            this.tmpSendWay=''

        },
        sourceIdChange:function(data) {                          
             this.queryParameter.sourceId = data.join(",")
        },
        subjectIdChange:function(data) {                          
             this.queryParameter.subjectId = data.join(",")
        },
        sendWayChange:function(data) {                          
             this.queryParameter.sendWay = data.join(",")
        }
    }
}
</script>

<style>
    .el-card{
        border:0px solid #EBEE 
        }
</style>