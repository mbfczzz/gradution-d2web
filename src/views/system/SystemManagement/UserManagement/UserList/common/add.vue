<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名" >
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="创建时间">
        <el-date-picker
        v-model="form.createTime"
        type="datetime"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd hh:mm:ss"
        clearable
            >
        </el-date-picker>
  </el-form-item>
  <el-form-item label="用户角色">
    <el-transfer 
    v-model="form.userole" 
    :data="options"
    :titles="['未有角色','已有角色']"
    :right-default-checked="form.userole"
    ></el-transfer>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="reset">重 置</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import api from '@/api'
export default {
    name:"add",
    props:['options'],
    data(){
        return{
            DialogVisible:false,
            title:"",
            form:{
              id:"",
              username:"",
              createTime:"",
              password:"",
              userole:[],
            },
        }
    },
    computed:{
      getTime:function () {
         return this.form.createTime.split(" ")[2];
      }
    },
    methods:{
      reset:function () {
        this.DialogVisible = false
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_USER({
          id:this.form.id,
          username:this.form.username,
          createTime:this.form.createTime,
          userole:this.form.userole.join(","),
          password:this.form.password
        })
        if(res.code){
        this.$message({
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