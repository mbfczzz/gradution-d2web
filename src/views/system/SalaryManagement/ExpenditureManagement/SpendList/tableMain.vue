<template>
  <div>
     <el-card>
     <el-button type="primary" @click="handleadd">添加支出</el-button>
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
        label="支出时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.spendTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="支出项目"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.itemName"
        effect="plain"
        type="success"
        >
        {{ scope.row.itemName}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="支出方式"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.wayName"
        effect="plain"
        type="success"
        >
        {{scope.row.wayName}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="支出人"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain">
        {{ scope.row.spendPeople}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="支出描述"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.spendMark"
        >
        {{ scope.row.spendMark}}
        </el-tag>
    </template>
    </el-table-column>    
        <el-table-column
        label="支出状态"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.statusName"
        effect="plain">
        {{ scope.row.statusName }}
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
    <edit
    ref="edit" 
    :statusNames="statusNames"
    :spendWays="spendWays"
    :spendItems="spendItems"       
     @reload='reload'         
     ></edit> 
    <add
    ref="add" 
    :statusNames="statusNames"
    :spendWays="spendWays"
    :spendItems="spendItems"       
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
export default {
  components: { PageInfo,edit,add},
    name:"tableMain",
    props:['tdata','statusNames','spendItems','spendWays'],
    data(){
        return {
          id:[]
        }
    },
    methods:{
     resetPage:function(data){
        this.$emit("resetPage",data)   
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
       const res = await api.DELETE_EXPENDITURE(this.id)
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
        this.$refs.edit.title = "修改支出信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.spendPeople = row.spendPeople
        this.$refs.edit.form.spendMark = row.spendMark
        this.$refs.edit.form.spendItem = Number.parseInt(row.spendItem)
        this.$refs.edit.form.spendWay = row.spendWay
        this.$refs.edit.form.spendStatus = Number.parseInt(row.spendStatus)       
        this.$refs.edit.tmp.id = row.id
        this.$refs.edit.tmp.spendPeople = row.spendPeople
        this.$refs.edit.tmp.spendMark = row.spendMark
        this.$refs.edit.tmp.spendItem = Number.parseInt(row.spendItem)
        this.$refs.edit.tmp.spendWay = row.spendWay
        this.$refs.edit.tmp.spendStatus = Number.parseInt(row.spendStatus)     
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
        const res = await api.DELETE_EXPENDITURE(arr)
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