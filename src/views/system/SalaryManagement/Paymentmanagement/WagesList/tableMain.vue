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
        label="支付时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.sendTime}}</span>
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
        label="工资状态"
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
        label="员工工资"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain">
        {{ scope.row.empMoney}}
        </el-tag>
    </template>  
    </el-table-column>
        <el-table-column
        label="工资描述"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        effect="plain"
        v-if="scope.row.moneyDescribe"
        >
        {{ scope.row.moneyDescribe}}
        </el-tag>
    </template>
    </el-table-column>    
        <el-table-column
        label="收款方式"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.refundName"
        effect="plain">
        {{ scope.row.refundName }}
        </el-tag>
    </template>  
    </el-table-column>  
        <el-table-column
        label="工资账套"
        width="180"
        align=center>
    <template slot-scope="scope">
        <el-tag
        v-if="scope.row.accountName"
        effect="plain">
        {{ scope.row.accountName }}
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
         :refundWays="refundWays"
         :moneyItems="moneyItems"    
     @reload='reload'         
     ></edit> 
    <add
    ref="add" 
         :statusNames="statusNames"
         :refundWays="refundWays"
         :moneyItems="moneyItems"     
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
    props:['tdata','statusNames','refundWays','moneyItems'],
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
       const res = await api.DELETE_MONEY(this.id)
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
        this.$refs.edit.title = "修改工资信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.form.empName = row.empName
        this.$refs.edit.form.statusId = row.statusId
        this.$refs.edit.form.empMoney = row.empMoney
        this.$refs.edit.form.moneyDescribe = row.moneyDescribe
        this.$refs.edit.form.refundWay = row.refundWay
        this.$refs.edit.form.moneyItem = Number.parseInt(row.moneyItem)  
        this.$refs.edit.tmp.id = row.id
        this.$refs.edit.tmp.empName = row.empName
        this.$refs.edit.tmp.statusId = row.statusId
        this.$refs.edit.tmp.empMoney = row.empMoney
        this.$refs.edit.tmp.moneyDescribe = row.moneyDescribe
        this.$refs.edit.tmp.refundWay = row.refundWay
        this.$refs.edit.tmp.moneyItem = Number.parseInt(row.moneyItem)        
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_MONEY(arr)
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