<template>
<el-dialog
  :title="title"
  :visible.sync="DialogVisible"
  width="40%"
  center>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="组件名" >
    <el-input v-model="form.name" placeholder="请输入组件名"></el-input>
  </el-form-item>
   <el-form-item label="权限名" >
    <el-input v-model="form.permissionName" placeholder="请输入权限名"></el-input>
  </el-form-item>
   <el-form-item label="url" >
    <el-input v-model="form.permissionUrl" placeholder="请输入url"></el-input>
  </el-form-item>
   <el-form-item label="组件路径" >
    <el-input v-model="form.component" placeholder="请输入组件路径"></el-input>
  </el-form-item>
    <el-form-item label="图标" >
    <el-input v-model="form.icon" placeholder="请输图标码"></el-input>
    </el-form-item>
    <el-form-item label="权限码" >
    <el-input v-model="form.permissionCode" placeholder="请输权限码"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
        <el-date-picker
        v-model="form.createTime"
        type="datetime"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd hh:mm:ss"
        clearable
            >
        </el-date-picker>
    </el-form-item>
     <el-form-item label="父级菜单">
        <el-cascader
        v-model="form.parentId"
        :options="permissions"
        expandTrigger="hover"
        :props="{checkStrictly: true,value:'id'}"
        :show-all-levels="false"
        clearable></el-cascader>
    </el-form-item>
     <el-form-item label="层级">
     <el-select v-model="form.Hierarchy" placeholder="请选择">
     <el-option
        v-for="item in Hierarchys"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
    </el-select>
    </el-form-item>
       <el-form-item label="权限类型">
       <el-select v-model="form.permissionType" placeholder="请选择">
     <el-option
        v-for="item in types"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="reset">重 置</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import api from '@/api'
import { Message } from 'element-ui';
export default {
    name:"edit",
    props:['types','permissions','Hierarchys'],
    data(){
        return{
            DialogVisible:false,
            title:"",
            form:{
              id:"",
              permissionName:"",
              permissionCode:"",
              createTime:"",
              permissionUrl:"",
              permissionType:"",
              parentId:"",
              Hierarchy:"",
              name:"",
              icon:""
            },
        }
    },
    methods:{
      reset:function () {
        this.DialogVisible = false
      },
      reload:function () {
        this.$emit("reload")
      },
      onSubmit:async function () {
        const res = await api.ADD_PERMISSION({
              id:this.form.id,
              permissionName:this.form.permissionName,
              permissionCode:this.form.permissionCode,
              createTime:this.form.createTime,
              permissionUrl:this.form.permissionUrl,
              permissionType:this.form.permissionType,
              parentId:this.form.parentId,
              hierarchy:this.form.Hierarchy,
              name:this.form.name,
              icon:this.form.icon
        })
        if(res.code){
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