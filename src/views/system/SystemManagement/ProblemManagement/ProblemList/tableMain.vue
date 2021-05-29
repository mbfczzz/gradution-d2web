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
      :default-sort = "{prop: 'operatorTime', order: 'descending'}"
      style="width: 100%">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
        prop="problemModel"
        label="问题模块"
        width="180"
        align=center>
    </el-table-column>
    <el-table-column
        prop="problemContent"
        label="具体问题"
        align=center>
    </el-table-column>
 <el-table-column
        width="200"
        label="是否完成"
        align=center>
     <template slot-scope="scope">
     <el-switch
        @change="switchBoolByIsValid(scope.$index, scope.row)"
        :active-value=1
        :inactive-value=0
        active-text="是"
        inactive-text="否"
        v-model="scope.row.isOk">
     </el-switch>   
     </template>        
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="提出时间"
        align=center>
    </el-table-column>
    <el-table-column
        prop="addPeople"
        label="添加人"
        align=center>
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
    <add
    ref="add" 
     @reload='reload'
     ></add> 
    <edit
    ref="edit" 
     @reload='reload'
     ></edit> 
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import api from '@/api'
import add from './common/add'
import edit from './common/edit'
import { Message } from 'element-ui';
export default {
  components: { PageInfo,edit,add },
    name:"tableMain",
    props:['tdata'],
    data(){
      return{
        id:[]
      }
    },
    methods:{
     resetPage:function(data){
        this.$emit("resetPage",data)   
      },  
     switchBoolByIsValid:async function(index,row){
         const res =  await api.UPDATE_PROBLEM({
            id:row.id,
            isOk:row.isOk
          })
        if(res.code ===200){
        Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });  
      }
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
       const res = await api.DELETE_PROBLEM(this.id)
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
        this.$refs.edit.title = "修改问题信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.problemModel = row.problemModel
        this.$refs.edit.form.problemContent = row.problemContent 
        this.$refs.edit.form.addPeople = row.addPeople
        this.$refs.edit.tmp.id = row.id
        this.$refs.edit.tmp.problemModel = row.problemModel
        this.$refs.edit.tmp.problemContent = row.problemContent 
        this.$refs.edit.tmp.addPeople = row.addPeople                               
      },   
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_PROBLEM(arr)
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

</style>