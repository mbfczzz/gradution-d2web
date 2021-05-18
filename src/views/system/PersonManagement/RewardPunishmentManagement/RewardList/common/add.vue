<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="奖惩内容" >
  <el-input
    type="textarea"
    autosize
    placeholder="请输入内容"
    v-model="form.rewardContent">
  </el-input>
  </el-form-item>
  <el-form-item label="奖惩员工">
    <el-card style="background-color:#67C23A">
      <div slot="header" class="clearfix">
        <el-select
            @change="currentEmp"
            v-model="this.empName"
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
      </div>
      <div>
          <div class="bgc">
            <span style="margin-right:200px">职位名</span>{{this.positionName}}
          </div>
          <div class="bgc">
            <span style="margin-right:200px">部门名</span>{{this.departmentName}}
          </div>
          <div class="bgc">
            <span style="margin-right:200px">手机号</span>{{this.empPhone}}
          </div>
      </div>
  </el-card>
  </el-form-item>
  <el-form-item label="奖惩名">
                            <el-select v-model="form.rewardStandard" 
                            @change="currentTemplate"
                            placeholder="请选择">
                                    <el-option
                                        v-for="item in standardNames"
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
    name:"add",
    props:['standardNames'],    
    data(){
        return{
            empData:[],
            loading:false,
            DialogVisible:false,
            title:"",
            empName:'',
            positionName:'',
            empPhone:"",
            departmentName:"",  
            standardName:"",                      
            form:{
              title:"",
              id:"",
              empId:'',    
              rewardStandard:0,                        
              rewardContent:''
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.rewardContent=this.tmp.empPhone,
              this.form.empId=this.tmp.empId,
              this.form.reward_standard=this.tmp.reward_standard
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
      onSubmit:async function () {
        const res = await api.ADD_REWARDS({
              id:this.form.id,
              rewardContent:this.form.rewardContent,
              empId:this.form.empId,
              rewardStandard:this.form.rewardStandard
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
      currentEmp: async function(name){
        const data = await api.GET_EMP_BYNAME(name)
        console.log(data.result);
        this.positionName = data.result.positionName,
        this.empPhone = data.result.empPhone,
        this.departmentName = data.result.departmentName
        this.empName = data.result.empName
        this.form.empId = data.result.id
      },
      currentTemplate:async function(name){
        const data = await api.GET_STANDARDBYNAME(name)
        this.form.rewardContent = data.result.rewardContent
        this.form.rewardStandard = data.result.id
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