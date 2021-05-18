<template>
  <div>
     <el-card>
     <el-button type="primary" @click="handleadd">添加员工</el-button>
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
        label="入职时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="员工名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.empName"
        effect="plain"
        type="success"
        >
        {{ scope.row.empName}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="员工地址"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.empAddress"
        effect="plain"
        type="success"
        >
        {{formatAddress(scope.row.empAddress)}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="电话号码"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain">
        {{ scope.row.empPhone}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="微信号"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.empWx"
        effect="plain">
        {{ scope.row.empWx }}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="邮箱"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.empEmail"
        >
        {{ scope.row.empEmail}}
        </el-tag>
    </template>
    </el-table-column>
            <el-table-column
        label="离职时间"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.leaveTime"
        >
        {{ scope.row.leaveTime}}
        </el-tag>
    </template>    
    </el-table-column>
    <el-table-column
        width="200"
        label="是否离职"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        :disabled="scope.row.isLeave"
        active-text="是"
        inactive-text="否"
        @change="handleLeave(scope.$index, scope.row)"
        v-model="scope.row.isLeave">
     </el-switch>   
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
          type="info"
          @click="attement(scope.$index, scope.row)">
          重新入职
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
    <edit
    ref="edit" 
     @reload='reload'
     ></edit> 
    <add
    ref="add" 
     @reload='reload'
     ></add>  
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import edit from './common/edit'
import add from './common/add'
import api from '@/api'
import { Message } from 'element-ui';
import { CodeToText } from 'element-china-area-data'
export default {
  components: { PageInfo,edit,add},
    name:"tableMain",
    props:['tdata'],
    data(){
        return {
          id:[],
          isLeave:1
        }
    },
    methods:{
      formatAddress:function (code) {
          let codeList = code.split(",")
          return CodeToText[codeList[0]]+CodeToText[codeList[1]]+CodeToText[codeList[2]]
        },
     resetPage:function(data){
        this.$emit("resetPage",data)   
      },  
      attement:function (index,row)
      {
        if(row.isLeave == 0){
            Message({
            showClose: true,
            message: "已离职!请不要重复操作",
            center:true,
            type:"info"
        });
        return
        }
        this.isLeave=0
        this.handleLeave(index,row)
      },      /**
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
       const res = await api.DELETE_EMP(this.id)
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
      handleadd:function () {
        this.$refs.add.DialogVisible = true
        this.$refs.add.title = "添加员工"
      },
      /**
       * 修改用户
       */
      handleEdit:function(index,row){
        this.$refs.edit.DialogVisible = true
        this.$refs.edit.title = "修改员工信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.empName = row.empName
        this.$refs.edit.form.empAddress = row.empAddress.split(",")
        this.$refs.edit.form.empWx = row.empWx
        this.$refs.edit.form.empEmail = row.empEmail
        this.$refs.edit.form.empPhone = row.empPhone
        this.$refs.edit.form.empPhone = row.empPhone
        this.$refs.edit.tmp.id = row.id
        this.$refs.edit.tmp.empName = row.empName
        this.$refs.edit.tmp.empAddress = row.empAddress.split(",")
        this.$refs.edit.tmp.empWx = row.empWx
        this.$refs.edit.tmp.empEmail = row.empEmail
        this.$refs.edit.tmp.empPhone = row.empPhone
        this.$refs.edit.tmp.empPhone = row.empPhone                            
      },
      getFormatTime: function (){
      let date = new Date()   
      let strDate = date.getFullYear().toString()+'-'+      
      (date.getMonth() + 1).toString()+'-'+     
      date.getDate().toString()+' '+     
      date.getHours().toString()+':'+           
      date.getMinutes().toString()+':'+         
      date.getSeconds().toString()
      return strDate
      },      
      handleLeave:async function (index,row) {
        const res = await api.UPDATE_EMP({
          id:row.id,
          isLeave:this.isLeave,
          leaveTime:this.getFormatTime()
          })
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
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_EMP(arr)
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