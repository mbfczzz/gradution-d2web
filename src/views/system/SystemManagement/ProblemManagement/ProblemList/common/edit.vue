<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="问题模块" >
  <el-input
    placeholder="请输入问题模块"
    v-model="form.problemModel">
  </el-input>
  </el-form-item>
    <el-form-item label="具体问题" >
  <el-input
    placeholder="请输入具体问题"
    v-model="form.problemContent">
  </el-input>
  </el-form-item>
      <el-form-item label="添加人" >
  <el-input
    placeholder="请输入添加人"
    v-model="form.addPeople">
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
            DialogVisible:false,
            title:"",
            form:{
            id:'',
            problemModel:'',
            problemContent:'',
            addPeople:''
            },
            tmp:{
            id:'',
            problemModel:'',
            problemContent:'',
            addPeople:''
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id
              this.form.problemModel = this.tmp.problemModel
              this.form.problemContent= this.tmp.problemContent
              this.form.addPeople=this.tmp.addPeople
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_PROBLEM({
              id:this.form.id,
              problemModel:this.form.problemModel,
              problemContent:this.form.problemContent,
              addPeople:this.form.addPeople                                          
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