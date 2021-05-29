<template>
  <div>
     <el-card>
     <el-button type="primary" @click="handleadd">添加考勤</el-button>
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
        label="考勤时间"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.attendanceTime}}</span>
    </template>    
    </el-table-column>
     <el-table-column
        label="打卡人"
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
        label="一次打卡"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.oneCard}}</span>
    </template>    
    </el-table-column>    
    <el-table-column
        label="二次打卡"
        width="200"
        align=center>
    <template slot-scope="scope">
        <i class="fa fa-clock-o" aria-hidden="true"></i> 
        <span style="margin-left: 10px">{{ scope.row.towCard}}</span>
    </template>    
    </el-table-column>   
   <el-table-column
        width="200"
        label="是否打卡"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isCard">
     </el-switch>   
     </template>        
    </el-table-column>
   <el-table-column
        width="200"
        label="是否完成待办"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isAgency">
     </el-switch>   
     </template>        
    </el-table-column>
   <el-table-column
        width="200"
        label="是否补卡"
        align=center>
     <template slot-scope="scope">
     <el-switch
        :active-value=1
        :inactive-value=0
        v-model="scope.row.isReplacement">
     </el-switch>   
     </template>        
    </el-table-column>          
  <el-table-column
        label="待办"
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
         v-for="k in scope.row.agencys" 
         v-bind:key="k.id"
         >
          {{k.agencyName}}
        </el-tag>
        <el-tag
        effect="dark"
        slot="reference"
        >
        {{scope.row.agencys[0].agencyName}}
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
                     :agencyNames="agencyNames"         
     ></edit> 
    <add
    ref="add" 
     @reload='reload'
                     :agencyNames="agencyNames"        
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
    props:['tdata','agencyNames'], 
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
       const res = await api.DELETE_ATTENDANCE(this.id)
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
        this.$refs.add.title = "添加考勤"
      },
      /**
       * 修改用户
       */
      handleEdit:function(index,row){
        this.$refs.edit.DialogVisible = true
        this.$refs.edit.title = "修改考勤信息"
        this.$refs.edit.form.id = row.id
        this.$refs.edit.flag = false
        this.$refs.edit.form.attendanceTime = row.attendanceTime
        this.$refs.edit.form.oneCard = row.oneCard
        this.$refs.edit.form.towCard = row.towCard
        this.$refs.edit.form.empName = row.empName     
        this.$refs.edit.form.cardPeople = row.cardPeople           
        this.$refs.edit.form.agencyStr = row.agencys.map((value)=>{
            return value.id
        })                           
      },
      /**
       * 单个删除
       */
      handleDelete: async function(index,row){
        let arr=[]
        arr.push(row.id)
        const res = await api.DELETE_ATTENDANCE(arr)
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