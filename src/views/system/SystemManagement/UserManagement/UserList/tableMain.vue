<template>
  <div>
     <el-card>
     <el-button type="primary" @click="addUser">添加</el-button>
     <el-button type="danger" @click="deleteUser">批量删除</el-button>
     <upload-csv :columns="columns" :data="tdata.list" :title="用户列表"></upload-csv>
     <upload-excel :columns="columns" :data="tdata.list" :title="用户列表"></upload-excel>
     </el-card> 
   <el-table
      ref="table"
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
        width="180"
        align=center>
    </el-table-column>
    <el-table-column
        label="创建时间"
        width="180"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
    </template>    
    </el-table-column>
    <el-table-column
        label="姓名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="dark">
        {{ scope.row.username }}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="角色"
        width="180"
        align=center>
    <template slot-scope="scope">
      <el-popover
        placement="top"
        trigger="hover"
          >
        <el-tag
         class="tag"
         effect="dark"
         v-for="k in scope.row.role" 
         v-bind:key="k.value"
         >
          {{k.name}}
        </el-tag>
        <el-tag
        effect="dark"
        slot="reference"
        >
        {{scope.row.userole.split(",")[0]}}
        </el-tag>
     </el-popover>
    </template>  
    </el-table-column>
    <el-table-column
        label="是否可用"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isValid ">
      </el-switch>   
     </template>        
    </el-table-column>
    <el-table-column
        label="是否绑定"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isBind">
     </el-switch>   
     </template>        
    </el-table-column>
    <el-table-column
        label="操作"
        width="500"
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
    <add ref="add" :options="data" @reload='reload'></add>
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import add from './common/add'
import api from '@/api'
import { Message } from 'element-ui';
import uploadCsv from '@/components/uploadCsv/uploadCsv'
import uploadExcel from '@/components/uploadExcel/uploadExcel'
export default {
  components: { PageInfo,add,uploadCsv,uploadExcel},
    name:"tableMain",
    props:['tdata','options'],
    data(){
      return{
        data : [],
        id:[],
        columns:[
          {label:"id",prop:"id"},
          {label:"是否可用",prop:"isValid"},
          {label:"是否绑定",prop:"isBind"},
          {lablel:"创建时间",prop:"createTime"},
          {label:"用户角色",prop:"userole"},
          {label:"姓名",prop:"username"}
          ]
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
        this.$refs.add.title = "添加用户"
        this.$refs.add.form.createTime = this.getFormatTime(new Date())
        this.$refs.add.form.id = ''
        this.$refs.add.form.password = ''
        this.$refs.add.form.username = ''
        this.$refs.add.form.userole = this.getDefaultRole()
      },
      /**
       * 批量删除
       */
      deleteUser:async function () {
       if(this.id.length==0){
          Message({
            showClose: true,
            message: "未勾选删除用户!",
            center:true,
            type:"warning"
        });
       }
       const res = await api.DELETE_USER(this.id)
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
       * 获取默认角色 普通用户
       */
      getDefaultRole:function () {
        let tmp=[]
        this.data.forEach(s=>{
          if(s.label ==="普通用户"){
            tmp.push(s.key)
          }
        })
        return tmp
      },
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
        this.$refs.add.DialogVisible = true
        this.$refs.add.title = "修改用户"
        this.$refs.add.form.id = row.id
        this.$refs.add.form.username = row.username
        this.$refs.add.form.createTime = row.createTime
        this.$refs.add.form.userole = this.roleValue(row.role)
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        console.log(row.id);
        arr.push(row.id)
        const res = await api.DELETE_USER(arr)
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