<template>
<el-card >
<el-row :gutter="20">
  <el-col :span="8">
    <el-card>
        <div slot="header" style="text-align:center">
        <span>
            <el-tag
            style="color:#67C23A"
            v-if="info.user.username"
            effect="dark"
            type="info"
            >
            {{info.user.username}}历史消息
            </el-tag></span>
        </div>
  <div>
    <history-deliver></history-deliver>
  </div>
</el-card>
    </el-col>
  <el-col :span="12">
  <div>
  <el-card>
  <div slot="header" class="clearfix">
    <span>发布消息</span>
  </div>
  <div style="padding-right:100px">
  <el-form ref="form" :model="form" label-width="80px" style="height:710px">
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
    <el-input type="textarea" 
    :rows="6"
    v-model="form.msgContent" class="widthClass"></el-input>
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
 </el-col>
  <el-col :span="4"></el-col>
</el-row>
</el-card>
</template>

<script>
import api from "@/api"
import { mapState } from 'vuex'
import HistoryDeliver from './DeliverAnnouncement/HistoryDeliver'
import { Message } from 'element-ui';
  export default {
    name:"DeliverAnnouncement",
    components:{HistoryDeliver},
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
            sendPeople : this.info.user.username,
            modelId : this.form.template,
            msgTitle : this.form.msgTitle,
            msgContent : this.form.msgContent,
            sendWay : this.form.tosendway,
            sendType : this.form.sendType
            })
          if(res.code===200){
              Message({
              showClose: true,
              message: res.message,
              center:true,
              type:"success"
          });
          }
          else{
              Message({
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
  width:600px;
}
.clearfix{
  text-align: center;
}
</style>