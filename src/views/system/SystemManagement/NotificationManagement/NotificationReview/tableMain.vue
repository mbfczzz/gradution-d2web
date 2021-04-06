<template>
  <div>
     <el-card>
     <el-button type="success" @click="CheckOks('驳回')">批量驳回</el-button>
     <el-button type="danger" @click="CheckOks('通过')">批量通过</el-button>
     </el-card>
   <el-table
      :data="tdata.list"
      max-height="600"
      height="1000"
      stripe
      @select="select"
      @select-all="select"
      :default-sort = "{prop: 'createTime', order: 'descending'}"
      style="width: 100%">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
        prop="id"
        label="id"
        width="100"
        align=center>
    </el-table-column>
    <el-table-column
        label="发送时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.sendTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="消息名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.msgTitle"
        effect="plain"
        type="success"
        >
        {{ scope.row.msgTitle }}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="消息内容"
        width="300"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.msgContent"
        effect="plain"
        type="success"
        >
        {{ scope.row.msgContent}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="发送方式"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain">
        {{ scope.row.sendWay}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="发送人"
        width="300"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.sendPeople"
        effect="plain"
        >
        {{ scope.row.sendPeople }}
        </el-tag>
    </template>  
    </el-table-column>
    <el-table-column
        label="当前状态"
        width="100"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.msgStatus"
        effect="dark"
        >
        {{ scope.row.msgStatus }}
        </el-tag>
    </template>  
    </el-table-column>
    <el-table-column
        label="操作"
        width="200"
        align=center
        >
    <template slot-scope="scope">
    <el-button
          size="mini"
          type="success"
          @click="CheckOk(scope.$index, scope.row)">
          审核通过
    </el-button>
    <el-button
          size="mini"
          type="danger"
          @click="ResetAnnounce(scope.$index, scope.row)">
          驳回重写
    </el-button>
    </template>    
    </el-table-column>
    </el-table>  
    <page-info :data="tdata" @resetPage="resetPage" style="margin-top:20px"></page-info>
    <edit
    ref="edit" 
    :msgSources="msgSources"
    :sendSubjects="sendSubjects"
    :sendWays="sendWays"
     @reload='reload'
     ></edit> 
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import edit from './common/edit'
import api from '@/api'
import { Message } from 'element-ui';
export default {
  components: { PageInfo,edit},
    name:"tableMain",
    props:['tdata','msgSources','sendSubjects','sendWays'],
    data(){
      return{
        mss:[],
        ssb:[],
        sws:[],
        id:[]
      }
    },
    watch:{
        msgSources: function(newVal,oldVal){
        this.mss = newVal
      },
        sendSubjects: function(newVal,oldVal){
        this.ssb = newVal
      },
        sendWays: function(newVal,oldVal){
        this.sws = newVal
      }  
		},
    methods:{
      /**
       * 批量删除
       */
      CheckOks:async function (type) {
       if(this.id.length==0){
          Message({
            showClose: true,
            message: "未勾选删除用户!",
            center:true,
            type:"warning"
        });
       }
       if(type === "驳回"){
        var res = await api.MSGREJECT(this.id)
       }else{
        var res = await api.CHECKOK(this.id)
       }
        if(res.code ===200){
          Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.reload()
        }
      },
      /**
       * 页面重载
       */
      reload:function () {
        this.$emit('reload')
      },
      /**
       * 多选事件
       */
      select:function (row) {
        let tmp=[]
        row.forEach(s=>{
          tmp.push(s.id)
        })
        this.id = tmp
      },
      /**
       * 格式化默认显示时间 yyyy-MM-dd hh:mm:ss
       */
      getFormatTime: function (date){ 
      let strDate = date.getFullYear().toString()+'-'+      
      (date.getMonth() + 1).toString()+'-'+     
      date.getDate().toString()+' '+     
      date.getHours().toString()+':'+           
      date.getMinutes().toString()+':'+         
      date.getSeconds().toString()
      return strDate
      },
      resetPage:function(data){
        this.$emit("resetPage",data)   
      },
      /**
       * 修改用户
       */
      handleEdit:function(index,row){
        this.$refs.edit.DialogVisible = true
        this.$refs.edit.form.title = "编辑消息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.sendTime = row.sendTime
        this.$refs.edit.form.msgTitle = row.msgTitle
        this.$refs.edit.form.msgContent = row.msgContent
        this.sws.forEach(s=>{
          if(row.sendWay === s.name){
             this.$refs.edit.form.sendWay = s.value
          }
        });
        this.$refs.edit.form.sendPeople = row.sendPeople
        this.mss.forEach(s=>{
          if(row.sourceId === s.name){
             this.$refs.edit.form.sourceId = s.value
          }
        }); 
        this.ssb.forEach(s=>{
          if(row.subjectId === s.name){
            this.$refs.edit.form.subjectId = s.value
          }
        });
        this.$refs.edit.tmp.id = row.id,
        this.$refs.edit.tmp.sendTime=row.sendTime,
        this.$refs.edit.tmp.msgTitle=row.msgTitle,
        this.$refs.edit.tmp.msgContent=row.msgContent,
        this.sws.forEach(s=>{
          if(row.sendWay === s.name){
              this.$refs.edit.tmp.sendWay = s.value
          }
        });
        this.$refs.edit.tmp.sendPeople=row.sendPeople,
        this.mss.forEach(s=>{
          if(row.sourceId === s.name){
            this.$refs.edit.tmp.sourceId = s.value
          }
        }); 
       this.ssb.forEach(s=>{
          if(row.subjectId === s.name){
            this.$refs.edit.tmp.subjectId = s.value
          }
        });
      },
      CheckOk: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.CHECKOK(arr)
        if(res.code ===200){
        Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.reload()
        }
      },
      ResetAnnounce:async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.MSGREJECT(arr)
        if(res.code ===200){
        Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.reload()
        }
      },
      }
}
</script>

<style scoped>
  .tag {
    margin-left: 10px;
    width: 70px;
    text-align: center;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>