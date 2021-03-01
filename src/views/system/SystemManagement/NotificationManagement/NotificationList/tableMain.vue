<template>
  <div>
     <el-card>
     <el-button type="primary" @click="addUser">添加</el-button>
     <el-button type="danger" @click="deleteUser">批量删除</el-button>
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
        effect="plain">
        {{ scope.row.sendPeople }}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="事件来源"
        width="100"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.sourceId"
        >
        {{ scope.row.sourceId }}
        </el-tag>
    </template>  
    </el-table-column>
            <el-table-column
        label="事件主体"
        width="100"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.subjectId"
        >
        {{ scope.row.subjectId }}
        </el-tag>
    </template>  
    </el-table-column>
    <el-table-column
        label="操作"
        fixed="right"
        width="300"
        align=center
        >
    <template slot-scope="scope">
    <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          编辑
    </el-button>
    <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
          删除
    </el-button>
    </template>    
    </el-table-column>
    </el-table>  
    <page-info :data="tdata" @resetPage="resetPage" style="margin-top:20px"></page-info>
    <add ref="add" 
    :types="types"
    :permissions="permissions"
    :Hierarchys="Hierarchys"
    @reload='reload'
    ></add> 
    <edit
    ref="edit" 
    :types="types"
    :permissions="permissions"
    :Hierarchys="Hierarchys"
     @reload='reload'
     ></edit> 
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import add from './common/add'
import edit from './common/edit'
import api from '@/api'
export default {
  components: { PageInfo,add,edit},
    name:"tableMain",
    props:['tdata','types','permissions','Hierarchys'],
    data(){
      return{
        data : [],
        id:[]
      }
    },
    watch:{
			options:function(newData,oldData){
        this.data = this.handlerData(newData)
			}
		},
    methods:{
      /**
       * 添加用户
       */
      addUser:function () {
        this.$refs.add.DialogVisible = true
        this.$refs.add.form.createTime = this.getFormatTime(new Date())
      },
      /**
       * 批量删除
       */
      deleteUser:async function () {
       if(this.id.length==0){
          this.$message({
            showClose: true,
            message: "未勾选删除用户!",
            center:true,
            type:"warning"
        });
       }
       const res = await api.DELETE_USER(this.id)
        if(res.code ===200){
        this.$message({
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
        this.$refs.edit.title = "编辑权限"
        this.$refs.edit.form.createTime = this.getFormatTime(new Date())
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.permissionUrl = row.permissionUrl
        this.$refs.edit.form.Hierarchy = row.hierarchy
        this.$refs.edit.form.parentId = row.parentId.toString()     
        this.$refs.edit.form.name = row.name
        this.$refs.edit.form.icon = row.icon
        this.$refs.edit.form.permissionType = row.permissionType
        this.$refs.edit.form.permissionName = row.permissionName
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_USER(arr)
        if(res.code ===200){
        this.$message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.reload()
        }
      },
      /**
       * 处理原始数据 转换成key value
       */
      handlerData(data){
      let tmp=[]
      data.forEach(element => {
      let obj = {
      key:element.value,
      label:element.name,
        }              
      tmp.push(obj)
        });
      return tmp
      },
      /**
       * 
       * 默认显示的角色
       */
      roleValue(arr){
      let tmp =[]
        arr.forEach(s=>{
            tmp.push(s.value)
        })
        return tmp
      }
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