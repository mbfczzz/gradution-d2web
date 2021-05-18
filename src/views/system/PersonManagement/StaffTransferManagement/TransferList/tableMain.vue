<template>
  <div>
     <el-card>
     <el-button type="primary" @click="handleadd">添加调动</el-button>
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
        label="调动时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.transferTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="调动原因"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.transferReason"
        effect="plain"
        type="success"
        >
        {{ scope.row.transferReason}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="源地址"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.sourceAddr"
        effect="plain"
        type="success"
        >
        {{formatAddress(scope.row.sourceAddr)}}
        </el-tag>
    </template>  
    </el-table-column> 
         <el-table-column
        label="目的地址"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.destineAddr"
        effect="plain"
        type="success"
        >
        {{ formatAddress(scope.row.destineAddr)}}
        </el-tag>
    </template>  
    </el-table-column>    
        <el-table-column
        label="当前状态"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.statusName"
        effect="plain"
        type="success"
        >
        {{scope.row.statusName}}
        </el-tag>
    </template>  
    </el-table-column>
           <el-table-column
        label="被调动人"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.empName"
        effect="plain"
        type="success"
        >
        {{scope.row.empName}}
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
     :status="status"
     @reload='reload'
     ></edit> 
    <add
    ref="add" 
    :status="status"
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
    props:['tdata','status'],
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
       const res = await api.DELETE_TRANSFER(this.id)
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
        this.$refs.add.title = "添加调动"
      },
      /**
       * 修改用户
       */
      handleEdit:function(index,row){
        this.$refs.edit.DialogVisible = true
        this.$refs.edit.title = "修改调动信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.transferReason = row.transferReason
        this.$refs.edit.form.statusName = row.statusId
        this.$refs.edit.form.empName = row.empName
        this.$refs.edit.form.sourceAddr = row.sourceAddr.split(",")
        this.$refs.edit.form.transferTime = row.transferTime
        this.$refs.edit.form.destineAddr = row.destineAddr.split(",")
        this.$refs.edit.tmp.id = row.id
        this.$refs.edit.tmp.transferReason = row.transferReason
        this.$refs.edit.form.statusName = row.statusId
        this.$refs.edit.tmp.empName = row.empName
        this.$refs.edit.tmp.sourceAddr = row.sourceAddr.split(",")
        this.$refs.edit.tmp.transferTime = row.transferTime
        this.$refs.edit.tmp.destineAddr = row.destineAddr.split(",")                          
      },    
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        console.log(row);
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_TRANSFER(arr)
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