<template>
  <div>
     <el-card>
     <el-button type="primary" @click="addRole">添加</el-button>
     <el-button type="danger" @click="deleteRole">批量删除</el-button>
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
        width="180"
        align=center>
    </el-table-column>
    <el-table-column
        label="创建时间"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
    </template>    
    </el-table-column>
        <el-table-column
        label="更新时间"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true" v-if="scope.row.updateTime"></i> 
        <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>
    </template>    
    </el-table-column>
    <el-table-column
        label="角色名"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="dark">
        {{ scope.row.roleName }}
        </el-tag>
    </template>  
    </el-table-column>
    <el-table-column
        label="是否可用"
        align=center>
     <template slot-scope="scope">
     <el-switch
        @change="switchBoolByIsValid(scope.$index, scope.row)"
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isValid ">
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
          type="info"
          size="mini"
          @click="handlePermission(scope.$index, scope.row)">
          分配角色权限
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
    <add ref="add" @reload='reload'></add>
    <edit-permission :options="options" @reload='reload' ref="permission"></edit-permission>
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
import add from './common/add'
import api from '@/api'
import editPermission from './common/editPermission'
export default {
  components: { PageInfo,editPermission,add},
    name:"tableMain",
    props:['tdata','options'],
    data(){
      return{
        id:[]
      }
    },
    methods:{
      /**
       * 添加角色
       */
      addRole:function () {
        this.$refs.add.DialogVisible = true
        this.$refs.add.title = "添加角色"
        this.$refs.add.form.createTime = this.getFormatTime(new Date())
        this.$refs.add.form.id = ''
        this.$refs.add.form.roleName = ''
        this.$refs.add.form.permission = this.getDefaultPermission()
      },
      switchBoolByIsValid:async function(index,row){
         const res =  await api.UPDATE_ROLE({
            id:row.id,
            isValid:row.isValid
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
       * 页面重载
       */
      reload:function () {
        this.$emit('reload')
      },
        /**
         * 编辑角色
         */
        handlePermission:function (index,row) {
        let id =[]
        this.$refs.permission.drawer = true
        row.permission.map(x=>{
          id.push(x.id)
          if(x.children.length>0){
             if(x.children===null){
              id.push(x.id) 
             }
             else{
              x.children.map(x=>{
                id.push(x.id)
                 if(x.children!=null){
                   x.children.map(x=>{
                   id.push(x.id)
                  })
                }
              })

             }
          }
          return id
        })
        this.$refs.permission.data = id
        this.$refs.permission.id = row.id
      },
      /**
       * 批量删除
       */
      deleteRole:async function () {
       if(this.id.length==0){
          this.$message({
            showClose: true,
            message: "未勾选删除角色!",
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
       * 修改角色
       */
      handleEdit:function(index,row){
        this.$refs.add.DialogVisible = true
        this.$refs.add.title = "修改角色"
        this.$refs.add.form.id = row.id
        this.$refs.add.form.roleName = row.roleName
        this.$refs.add.form.createTime = row.createTime
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