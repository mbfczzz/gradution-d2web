<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="员工名" >
    <el-input v-model="form.empName" placeholder="请输入员工名"></el-input>
  </el-form-item>
  <el-form-item label="员工微信号">
    <el-input v-model="form.empWx" placeholder="请输入员工微信号"></el-input>
  </el-form-item>
  <el-form-item label="员工手机号" >
    <el-input v-model="form.empPhone" placeholder="请输入员工手机号"></el-input>
  </el-form-item>
  <el-form-item label="员工邮箱">
    <el-input v-model="form.empEmail" placeholder="请输入员工邮箱"></el-input>
  </el-form-item>
  <el-form-item label="员工地址">
    <el-cascader
                            size="large"
                            :options="options"
                            v-model="form.empAddress"
                            @change="handleChange">
                        </el-cascader>
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
import { regionDataPlus } from 'element-china-area-data'
export default {
    name:"edit",
    data(){
        return{
            options: regionDataPlus,
            DialogVisible:false,
            title:"",
            form:{
              title:"",
              id:"",
              empName:"",
              empPhone:"",
              empEmail:"",
              empAddress:"",
              empWx:""
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = '',
              this.form.empName='',
              this.form.empPhone='',
              this.form.empEmail='',
              this.form.empWx='',
              this.form.empAddress=''
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.ADD_EMP({
              empPhone:this.form.empPhone,
              empWx:this.form.empWx,
              empEmail:this.form.empEmail,
              empAddress:this.form.empAddress,
              empName:this.form.empName,
              createTime:this.form.createTime
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
      handleChange (data) {
          this.form.empAddress = data.join(",")
      }
    }
}
</script>

<style scoped>

</style>