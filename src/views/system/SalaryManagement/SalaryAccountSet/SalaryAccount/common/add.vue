<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="应发工资" >
  <el-input
    placeholder="请输入应发工资"
    v-model="form.spendMoney">
  </el-input>
  </el-form-item>
  <el-form-item label="账套名" >
  <el-input
    placeholder="请输入账套名"
    v-model="form.accountName">
  </el-input>
  </el-form-item>
  <el-form-item label="账套描述" >
  <el-input
    placeholder="请输入账套描述"
    v-model="form.accountDescribe">
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
    name:"add",
    data(){
        return{
            loading:false,
            DialogVisible:false,
            title:"",
            form:{
              id:"",
              spendMoney:'',
              accountName:'',
              accountDescribe:''
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = '',
              this.form.spendMoney='',
              this.form.accountName='',
              this.form.accountDescribe=''
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.ADD_ACCOUNT({
              id:this.form.id,
              spendMoney:this.form.spendMoney,
              accountName:this.form.accountName,
              accountDescribe:this.form.accountDescribe
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