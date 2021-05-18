<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="奖惩名" >
    <el-input v-model="form.standardName" placeholder="请输入奖惩名"></el-input>
  </el-form-item>
  <el-form-item label="奖惩内容">
    <el-input v-model="form.standardType" placeholder="请输入奖惩内容"></el-input>
  </el-form-item>
  <el-form-item label="奖惩描述" >
                             <el-select v-model="form.standardType" placeholder="请选择" >
                                    <el-option
                                        v-for="item in standardTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
  </el-form-item>
  <el-form-item label="规范类型" >
                            <el-select v-model="form.rewardDescribe" placeholder="请选择">
                                    <el-option
                                        v-for="item in rewardDescribes"
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
    props:['standardTypes','rewardDescribes'],
    data(){
        return{
            DialogVisible:false,
            title:"",
            form:{
              title:"",
              id:"",
              standardName:'',
              standardType:'',
              createTime:'',
              rewardContent:'',
              rewardDescribe:''
            },
            tmp:{
              title:"",
              id:"",
              standardName:'',
              standardType:'',
              createTime:'',
              rewardContent:'',
              rewardDescribe:''
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.standardName=this.tmp.standardName,
              this.form.standardType=this.tmp.standardType,
              this.form.rewardContent=this.tmp.rewardContent
              this.form.rewardDescribe=this.tmp.rewardDescribe
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_EMP({
              id:this.form.id,
              standardName:this.form.standardName,
              standardType:this.form.standardType,
              rewardContent:this.form.rewardContent,
              rewardDescribe:this.form.rewardDescribe,
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