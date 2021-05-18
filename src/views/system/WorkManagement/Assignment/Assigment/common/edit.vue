<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
<el-form-item label="被调动人">
    <el-select
    @change="change"
    v-model="form.empName"
    filterable
    remote
    no-data-text
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in empData"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="任务名">
                           <el-select v-model="form.taskId" placeholder="请选择">
                             <el-option
                                     v-for="item in  taskNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
  <el-form-item label="当前状态">
                           <el-select v-model="form.statusId" placeholder="请选择">
                             <el-option
                                     v-for="item in  statusNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="onSubmit">确 定</el-button>
    <el-button @click="reset">重 置</el-button>
  </span>
</el-dialog>
</template>

<script>
import api from '@/api'
import { Message } from 'element-ui';
export default {
    name:"edit",
        props:['statusNames','taskNames'],
    data(){
        return{
            empData:[],
            flag:false,
            loading:false,
            DialogVisible:false,
            title:"",
            form:{
            empName:'',
            id:"",
            taskId:'',
            statusId:'',
            empId:''
            },
            tmp:{
            empName:'',
            id:"",
            taskId:'',
            statusId:'',
            empId:''          
              },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.empName = this.tmp.empName
              this.form.taskId=this.tmp.taskId,
              this.form.statusId=this.tmp.statusId
              this.form.empId=this.tmp.empId
      },
      reload:function () {
        this.$emit("reload")
      },
        async remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          const data = await api.GET_MAPEMP_LIST(query)
          if(data.code===200 && data.result.length>0){
                this.empData = data.result
                this.loading = false
          }
        } else {
          this.empData = [];
        }
      }, 
      change:function(){
          if(this.flag===false){
            this.flag=true
          }
      },
      onSubmit:async function () {
        if(this.flag === false){
          this.form.empName = this.form.empId
        }
        const res = await api.UPDATE_ASSIGMENT({
              id:this.form.id,
              taskId:this.form.taskId,
              statusId:this.form.statusId,
              empId:this.form.empName
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
      }
    }
}
</script>

<style scoped>
.bgc{
  background-color: #E6A23C;
  padding-left: 10px;
  margin-bottom: 5px;
}
</style>