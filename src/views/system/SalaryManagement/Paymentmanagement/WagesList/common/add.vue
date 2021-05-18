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
    v-model="form.empName">
  </el-input>
  </el-form-item>
    <el-form-item label="支出金额" >
  <el-input
    type="textarea"
    autosize
    placeholder="请输入支出金额"
    v-model="form.empMoney">
  </el-input>
  </el-form-item>   
   <el-form-item label="支出描述" >
  <el-input
    type="textarea"
    autosize
    placeholder="请输入支出描述"
    v-model="form.moneyDescribe">
  </el-input>
  </el-form-item> 
  <el-form-item label="支出状态">
                           <el-select v-model="form.statusId" placeholder="请选择">
                             <el-option
                                     v-for="item in  statusNames"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
  <el-form-item label="支出账套">
                           <el-select v-model="form.moneyItem" placeholder="请选择">
                             <el-option
                                     v-for="item in  moneyItems"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                    </el-select>
  </el-form-item>
   <el-form-item label="支出方式">
                           <el-select v-model="form.refundWay" placeholder="请选择">
                              <el-option
                                     v-for="item in  refundWays"
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
    props:['statusNames','refundWays','moneyItems'],
    data(){
        return{
            loading:false,
            DialogVisible:false,
            title:"",
            form:{
              empName:'',
              id:'',
              statusId:13,
              empMoney:'',
              moneyDescribe:'',
              refundWay:1,
              moneyItem:0
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = ''
              this.form.empName=''
              this.form.statusId=''
              this.form.empMoney=''
              this.form.moneyDescribe=''
              this.form.refundWay=''
              this.form.moneyItem=''
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.ADD_MONEY({
              id:this.form.id,
              empName:this.form.empName,
              statusId:this.form.statusId,
              empMoney:this.form.empMoney,
              moneyDescribe:this.form.moneyDescribe,
              refundWay:this.form.refundWay,
              moneyItem:this.form.moneyItem              
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