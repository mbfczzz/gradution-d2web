<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="部门名" >
    <el-input v-model="form.departmentName" placeholder="请输入部门"></el-input>
  </el-form-item>
  <el-form-item label="部门备注">
    <el-input v-model="form.departmentMark" placeholder="请输入部门备注"></el-input>
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
    data(){
        return{
            DialogVisible:false,
            title:"",
            form:{
              title:"",
              id:"",
              departmentName:"",
              departmentMark:""
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = '',
              this.form.departmentName='',
              this.form.departmentMark=''
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.ADD_DEPARTMENT({
              departmentName:this.form.departmentName,
              departmentMark:this.form.departmentMark,
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

</style>