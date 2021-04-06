<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="角色名" >
    <el-input v-model="form.roleName" placeholder="请输入角色名"></el-input>
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
    data(){
        return{
            DialogVisible:false,
            title:"",
            form:{
              id:"",
              roleName:"",
              createTime:"",
            },
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
        const res = await api.UPDATE_ROLE({
          id:this.form.id,
          roleName:this.form.roleName,
          createTime:this.form.createTime,
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
      },
    }
}
</script>

<style scoped>

</style>