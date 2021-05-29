<template>
  <div>
     <el-card>
     <el-button type="primary" @click="handleadd">添加招聘</el-button>
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
        label="发布时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.recruitTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="招聘内容"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.recruitContent"
        effect="plain"
        type="success"
        >
        {{ scope.row.recruitContent}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="招聘标题名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.recruitName"
        effect="plain"
        type="success"
        >
        {{scope.row.recruitName}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="员工名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain">
        {{ scope.row.empName}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="职位名"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.positionName"
        >
        {{ scope.row.positionName}}
        </el-tag>
    </template>
    </el-table-column>
  <el-table-column
        label="要求"
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
         v-for="k in scope.row.rules" 
         v-bind:key="k.id"
         >
          {{k.ruleName}}
        </el-tag>
        <el-tag
        effect="dark"
        slot="reference"
        >
        {{scope.row.rules[0].ruleName}}
        </el-tag>
     </el-popover>
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
     @reload='reload'
                     :positionNames="positionNames"      
                     :roleNames="roleNames"    
     ></edit> 
    <add
    ref="add" 
     @reload='reload'
                     :positionNames="positionNames"      
                     :roleNames="roleNames"     
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
    props:['tdata','positionNames','roleNames'], 
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
       const res = await api.DELETE_REWARDS(this.id)
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
        this.$refs.edit.flag = false
        this.$refs.edit.form.releasePeople = row.empName
        this.$refs.edit.form.empId = row.empId
        this.$refs.edit.form.recruitContent = row.recruitContent
        this.$refs.edit.form.recruitPosition = row.recruitPosition     
        this.$refs.edit.form.recruitName = row.recruitName
        this.$refs.edit.form.ruleStr = row.rules.map((value)=>{
            return value.id
        })    
        console.log(ruleStr)                         
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_REWARDS(arr)
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