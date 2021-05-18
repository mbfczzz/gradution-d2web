<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="源部门" >
                       <el-select v-model="form.sourceDepartment"  placeholder="请选择">
                            <el-option
                            v-for="item in destineDepartmentNames"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
      </el-form-item>
  <el-form-item label="目的部门">
                       <el-select v-model="form.destineDepartment" placeholder="请选择">
                            <el-option
                            v-for="item in destineDepartmentNames"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
     </el-form-item>
  <el-form-item label="当前状态">
       <el-select v-model="form.statusId" placeholder="请选择">
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
    @change="change"
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
export default {
    name:"edit",
    props:['status','destineDepartmentNames'],
    data(){
        return{
            empData:[],
            flag:false,
            loading:false,
            DialogVisible:false,
            title:"",
            form:{
            id:"",
            sourceDepartment:'',
            destineDepartment:'',
            statusId:'',
            transferTime:'',
            empId:'',
            empName:'',
            transferReason:''
            },
            tmp:{
             id:"",
            sourceDepartment:'',
            destineDepartment:'',
            statusId:'',
            empName:'',
            transferTime:'',
            empId:'',
            transferReason:''
            },
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = this.tmp.id,
              this.form.sourceDepartment=this.tmp.sourceDepartment,
              this.form.destineDepartment=this.tmp.sourceDepartment,
              this.form.statusId=this.tmp.statusId,
              this.form.transferTime=this.tmp.transferTime,
              this.form.empId=this.tmp.empId
              this.form.transferReason=this.tmp.transferReason              
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
      change:function(){
          if(this.flag===false){
            this.flag=true
          }
      },
      onSubmit:async function () {
        if(this.flag === false){
          this.form.empName = this.form.empId
        }
        const res = await api.UPDATE_JOBTRANSFER({
              id:this.form.id,
              sourceDepartment:this.form.sourceDepartment,
              destineDepartment:this.form.destineDepartment,
              statusId:this.form.statusId,
              transferTime:this.form.transferTime,
              empId:this.form.empName,
              transferReason:this.form.transferReason,  
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

</style>