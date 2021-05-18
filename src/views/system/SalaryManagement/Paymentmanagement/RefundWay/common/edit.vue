<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="方式名" >
  <el-input
    placeholder="请输入方式名"
    v-model="form.refundName">
  </el-input>
  </el-form-item>
    <el-form-item label="方式描述" >
  <el-input
    placeholder="请输入方式描述"
    v-model="form.refundDescribe">
  </el-input>
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
            id:"",
            refundName:'',
            refundDescribe:'',
            },
            tmp:{
            id:"",
            refundName:'',
            refundDescribe:'',
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.refundName=this.tmp.refundName,
              this.form.refundDescribe=this.tmp.refundDescribe
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_REFUNDWAY({
              id:this.form.id,
              refundName:this.form.refundName,
              refundDescribe:this.form.refundDescribe
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