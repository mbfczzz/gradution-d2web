<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="源地址" >
        <el-cascader
                            size="large"
                            :options="options"
                            v-model="form.sourceAddr"
                            @change="sourceAddrHandleChange">
                        </el-cascader>
      </el-form-item>
  <el-form-item label="目的地址">
       <el-cascader
                            size="large"
                            :options="options"
                            v-model="form.destineAddr"
                            @change="destineAddrHandleChange">
                        </el-cascader>
     </el-form-item>
  <el-form-item label="当前状态">
       <el-select v-model="form.statusName" placeholder="请选择">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
             </el-option>
                                    </el-select>
                    </el-form-item> 
  <el-form-item label="调动原因" >
    <el-input v-model="form.transferReason" placeholder="请输入调动原因"></el-input>
  </el-form-item>
<el-form-item label="被调动人">
      <el-select
    v-model="form.empName"
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
  </el-form-item>
    <el-form-item label="调动时间">
        <el-date-picker
        v-model="form.transferTime"
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
            loading:false,
            empData:[],
            options: regionDataPlus,
            DialogVisible:false,
            title:"",
            form:{
            id:"",
            sourceAddr:'',
            empId:'',
            statusId:'',
            destineAddr:'',
            transferTime:'',
            transferReason:"",
            empName:'',
            statusName:""
            },
            tmp:{
            id:"",
            empId:'',
            statusId:'',            
            sourceAddr:'',
            destineAddr:'',
            transferTime:'',
            transferReason:"",
            empName:'',
            statusName:""
            },
        }
    },
    props:['status'],
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.sourceAddr=this.tmp.sourceAddr,
              this.form.destineAddr=this.tmp.destineAddr,
              this.form.transferTime=this.tmp.transferTime,
              this.form.transferReason=this.tmp.transferReason,
              this.form.empName=this.tmp.empName
              this.form.statusName=this.tmp.statusName              
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
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        let source = this.form.sourceAddr;
        let destine = this.form.destineAddr;
        if(source instanceof Array){
            source = source.join(",")
        }
        if(destine instanceof Array){
            destine = destine.join(",")
        }
        const res = await api.UPDATE_TRANSFER({
              id:this.form.id,
              sourceAddr:source,
              destineAddr:destine,
              transferTime:this.form.transferTime,
              transferReason:this.form.transferReason,
              empName:this.form.empName,
              statusId:this.form.statusName,  
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
      sourceAddrHandleChange:function(data) {
          this.form.sourceAddr = data.join(",")
      },
      destineAddrHandleChange:function(data) {
          this.form.destineAddr = data.join(",")
      },
    }
}
</script>

<style scoped>

</style>