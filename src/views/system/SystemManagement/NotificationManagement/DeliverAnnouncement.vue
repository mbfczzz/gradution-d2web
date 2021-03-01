<template>
<div style="position:absolute;width:50%">
  <el-card class="box-card" style="position:relative;left:400px;top:50px">
  <div slot="header" class="clearfix">
    <span>发布消息</span>
  </div>
  <div>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="发送人">
  <div class="tag-group">
  <span class="tag-group__title"><el-tag type="success">{{info.user.username}}</el-tag></span>
</div>
  </el-form-item>
    <el-form-item label="当前模板">
    <el-select v-model="form.template" placeholder="请选择模板" class="widthClass"
    @change="change"
    >
      <el-option label="自定义模板" value="0"></el-option>
                            <el-option
                            v-for="item in templateType"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="form.msgTitle" class="widthClass"></el-input>
  </el-form-item>
  <el-form-item label="消息内容">
    <el-input type="textarea" v-model="form.msgContent" class="widthClass"></el-input>
  </el-form-item>
  <el-form-item label="发送方式">
    <el-select v-model="form.tosendway" placeholder="请选择发送方式" class="widthClass">
                            <el-option
                            v-for="item in fromsendway"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="发送类型">
    <el-select v-model="form.sendType" placeholder="请选择发送类型" class="widthClass">
      <el-option label="单人" value="0"></el-option>
      <el-option label="多人" value="1"></el-option>
      <el-option label="所有人" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>
  </div>
</el-card>
</div>
</template>

<script>
import api from "@/api"
import { mapState } from 'vuex'
  export default {
    name:"DeliverAnnouncement",
    data() {
      return {
        fromsendway:[],
        templateType:[],
        form: {
          msgTitle: '',
          msgContent: '',
          sendPeople:'',
          template:'0',
          tosendway:3,
          sendType:'2'
        }
      }
    },
    computed:{
            ...mapState('d2admin/user',[
                'info'
            ]),
    },
    mounted() {
        this.getSendWay()
        this.getTemplate()
    },
    methods: {
      onSubmit:async function(){
          const res = await api.SEND_MESSAGE({
            sendPeople : this.info.name,
            modelId : this.form.template,
            msgTitle : this.form.msgTitle,
            msgContent : this.form.msgContent,
            sendWay : this.form.tosendway,
            sendType : this.form.sendType
            })
          if(res.code===200){
          this.$message({
              showClose: true,
              message: res.message,
              center:true,
              type:"success"
          });
          }
          else{
          this.$message({
              showClose: true,
              message: res.message,
              center:true,
              type:"fail"
          });
          }
      },
      change:function(value){
        this.currentTemplate(value)
      },
      currentTemplate:async function(value){
        if(value!=0){
          const data = await api.GET_CURRENT_TEMPLATE(value)
          this.form.msgTitle = data.result.title
          this.form.msgContent = data.result.msgContent
          this.form.tosendway = data.result.wayId
        }else{
          this.form.msgTitle = ''
          this.form.msgContent = ''
          this.form.tosendway = 3
        }
      },
      getSendWay: async function(){
        const data = await api.SEND_WAY()
        this.fromsendway = data.result
      },
      getTemplate: async function(){
        const data = await api.GET_TEMPLATE()
        this.templateType = data.result
      }
    }
  }
</script>

<style scoped>
.widthClass{
  width: 700px;
}
.clearfix{
  text-align: center;
}
</style>