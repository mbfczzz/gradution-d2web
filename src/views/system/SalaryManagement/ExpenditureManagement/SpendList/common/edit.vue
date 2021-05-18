<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="支出人" >
  <el-input
    placeholder="请输入支出人"
    v-model="form.spendPeople">
  </el-input>
  </el-form-item>
   <el-form-item label="支出描述" >
  <el-input
    type="textarea"
    autosize
    placeholder="请输入支出描述"
    v-model="form.spendMark">
  </el-input>
  </el-form-item> 
  <el-form-item label="支出状态">
                           <el-select v-model="form.spendStatus" placeholder="请选择">
                             <el-option
                                     v-for="item in  statusNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
  <el-form-item label="支出项目">
                           <el-select v-model="form.spendItem" placeholder="请选择">
                             <el-option
                                     v-for="item in  spendItems"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
   <el-form-item label="支出方式">
                           <el-select v-model="form.spendWay" placeholder="请选择">
                              <el-option
                                     v-for="item in  spendWays"
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
        props:['statusNames','spendItems','spendWays'],
    data(){
        return{
            empData:[],
            loading:false,
            DialogVisible:false,
            title:"",
            form:{
              id:"",
              spendPeople:"",
              spendMark:"",
              spendItem:"",
              spendWay:"",
              spendStatus:"",
            },
            tmp:{
              id:"",
              spendPeople:"",
              spendMark:"",
              spendItem:"",
              spendWay:"",
              spendStatus:"",
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.spendPeople=this.tmp.spendPeople,
              this.form.spendItem=this.tmp.spendItem,
              this.form.spendWay=this.tmp.spendWay
              this.form.spendMark=this.tmp.spendMark
              this.form.spendStatus=this.tmp.spendStatus
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.UPDATE_EXPENDITURE({
              id:this.form.id,
              spendPeople:this.form.spendPeople,
              spendItem:this.form.spendItem,
              spendWay:this.form.spendWay,
              spendMark:this.form.spendMark,
              spendStatus:this.form.spendStatus
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