<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="消息名" >
    <el-input v-model="form.msgTitle" placeholder="请输入消息名"></el-input>
  </el-form-item>
   <el-form-item label="消息内容">
    <el-input v-model="form.msgContent" placeholder="请输入消息内容"></el-input>
  </el-form-item>
   <el-form-item label="发送人" >
    <el-input v-model="form.sendPeople" placeholder="请输入发送人"></el-input>
  </el-form-item>
    <el-form-item label="发送方式">
         <el-select v-model="form.sendWay" placeholder="请选择">
    <el-option
      v-for="item in sendWays"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
   <el-form-item label="事件来源">
         <el-select v-model="form.sourceId" placeholder="请选择">
    <el-option
      v-for="item in msgSources"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="事件主体">
        <el-select v-model="form.subjectId" placeholder="请选择">
    <el-option
      v-for="item in sendSubjects"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item> 
    <el-form-item label="发送时间">
        <el-date-picker
        v-model="form.sendTime"
        type="datetime"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd hh:mm:ss"
        clearable
            >
        </el-date-picker>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="reset">重 置</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import api from '@/api'
import { Message } from 'element-ui';
export default {
    name:"edit",
    props:['msgSources','sendSubjects','sendWays'],
    data(){
        return{
            DialogVisible:false,
            title:"",
            tmp:{
              title:"",
              id:"",
              sendTime:"",
              msgTitle:"",
              msgContent:"",
              sendWay:"",
              sendPeople:"",
              sourceId:"",
              subjectId:""
            },
            form:{
              title:"",
              id:"",
              sendTime:"",
              msgTitle:"",
              msgContent:"",
              sendWay:"",
              sendPeople:"",
              sourceId:"",   
              subjectId:""        
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.sendTime=this.tmp.sendTime,
              this.form.msgTitle=this.tmp.msgTitle,
              this.form.msgContent=this.tmp.msgContent,
              this.form.sendWay=this.tmp.sendWay,
              this.form.sendPeople=this.tmp.sendPeople,
              this.form.sourceId=this.tmp.sourceId,
              this.form.subjectId=this.tmp.subjectId
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_MSG({
              id:this.form.id,
              sendTime:this.form.sendTime,
              msgTitle:this.form.msgTitle,
              msgContent:this.form.msgContent,
              sendWay:this.form.sendWay,
              sendPeople:this.form.sendPeople,
              sourceId:this.form.sourceId,
              subjectId:this.form.subjectId,
        })
        console.log(this);
        if(res.code===200){
        Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.DialogVisible = false
        this.reload()
        }
      }
    }
}
</script>

<style scoped>

</style>