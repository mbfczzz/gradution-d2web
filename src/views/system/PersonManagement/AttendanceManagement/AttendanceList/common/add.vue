<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
     <el-form ref="userForm" :model="form" label-width="100px">
                    <el-form-item label="员工名">
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
                    <el-form-item label="考勤时间">
                        <el-date-picker
                            v-model="form.attendanceTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            clearable
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="一次打卡">
                   <el-date-picker
                    v-model="form.oneCard"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"                    
                    >
                    </el-date-picker>                        
                    </el-form-item>     
             <el-form-item label="二次打卡">
                   <el-date-picker
                    v-model="form.towCard"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"                    
                    >
                    </el-date-picker>
             </el-form-item>
            <el-form-item label="待办">
              <el-transfer 
              v-model="form.agencyStr" 
              :data="agencyNames"
              :titles="['未有角色','已有角色']"
              :right-default-checked="form.agencyStr"
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
import {getTime,parseTime} from '@/utils/index'
import api from '@/api'
import { Message } from 'element-ui';
export default {
    name:"add",
    props:['agencyNames'],   
    data(){
        return{
            empData:[],
            loading:false,
            DialogVisible:false,
            title:"",                 
            form:{
                id:"",
                attendanceTime:parseTime(getTime()),
                oneCard:parseTime(getTime()),         
                towCard:parseTime(getTime()),
                empName:'',
                agencyStr:[]
            }
        }
    },
    mounted(){

    },
    methods:{
      reset:function () {
              this.form.id = '',
              this.form.attendanceTime=parseTime(getTime())
              this.form.oneCard=parseTime(getTime())
              this.form.towCard=parseTime(getTime())
              this.form.empName=''
              this.form.agencyStr=[]             
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
        const res = await api.ADD_ATTENDANCE({
              id:this.form.id,
              attendanceTime:this.form.attendanceTime,
              oneCard:this.form.oneCard,
              towCard:this.form.towCard,
              cardPeople:this.form.empName,
              agencyStr:this.form.agencyStr.join(",")                          
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