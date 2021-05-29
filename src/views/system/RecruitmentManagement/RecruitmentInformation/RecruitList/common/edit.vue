<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="招聘内容" >
  <el-input
    type="textarea"
    autosize
    placeholder="请输入内容"
    v-model="form.recruitContent">
  </el-input>
  </el-form-item>
    <el-form-item label="招聘标题" >
  <el-input
    placeholder="请输入招聘标题"
    v-model="form.recruitName">
  </el-input>
  </el-form-item>
  <el-form-item label="员工名">
        <el-select
            v-model="form.releasePeople"
            filterable
            remote
            no-data-text
            @change="change"
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
  </el-form-item>
  <el-form-item label="职位名">
                            <el-select v-model="form.recruitPosition" 
                            placeholder="请选择">
                                    <el-option
                                        v-for="item in positionNames"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
  </el-form-item>
   <el-form-item label="要求">
   <el-transfer 
    v-model="form.ruleStr" 
    :data="roleNames"
    :titles="['未有要求','已有要求']"
    :right-default-checked="form.ruleStr"
    ></el-transfer>
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
    props:['positionNames','roleNames'],   
    data(){
        return{
          test:[],
            flag:false,
            empData:[],
            loading:false,
            DialogVisible:false,
            title:"",                 
            form:{
              id:"",
              empId:"",
              releasePeople:'',    
              recruitContent:'',                        
              recruitPosition:'',
              recruitName:'',
              ruleStr:''
            },
            tmp:{
              id:"",
              releasePeople:'',    
              recruitContent:'',                        
              recruitPosition:'',
              recruitName:'',
              ruleStr:''
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.empId=this.tmp.empId
              this.form.releasePeople=this.tmp.releasePeople,
              this.form.recruitContent=this.tmp.recruitContent,
              this.form.recruitPosition=this.tmp.recruitPosition
              this.form.recruitName=this.tmp.recruitName
              this.form.ruleStr=this.tmp.ruleStr             
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
      change:function(){
        if(this.flag===false){
          this.flag=true
        }
      } ,      
      onSubmit:async function () {
        if(this.flag === false){
          this.form.releasePeople = this.form.empId
        }
        const res = await api.UPDATE_RECRUIT({
              id:this.form.id,
              releasePeople:this.form.releasePeople,
              recruitContent:this.form.recruitContent,
              recruitPosition:this.form.recruitPosition,
              recruitName:this.form.recruitName,
              ruleStr:this.form.ruleStr.join(",")                            
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