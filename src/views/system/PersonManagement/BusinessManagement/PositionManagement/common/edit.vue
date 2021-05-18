<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="职位名" >
            <el-input v-model="form.positionName" placeholder="请输入职位名"></el-input>
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
              positionName:""
            },
            tmp:{
              title:"",
              id:"",
              positionName:""
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.positionName=this.tmp.positionName
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_POSITION({
              id:this.form.id,
              positionName:this.form.positionName,
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
    }
}
</script>

<style scoped>

</style>