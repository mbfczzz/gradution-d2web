<template>
<div>
    <el-drawer
    title="角色权限编辑"
    :visible.sync="drawer"
    close-on-press-escape
    :show-close="false"
    :direction="direction"
    destroy-on-close
    :before-close="handleClose"
    >
    <el-tree
    :data="options"
    show-checkbox
    default-expand-all
    :default-checked-keys="data"
    node-key="id"
    ref="tree"
    highlight-current>
</el-tree>
    </el-drawer>   
</div> 
</template>

<script>
import api from '@/api'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
export default {
    name:"editPermission",
    props:["options"],
    data() {
      return {
        drawer: false,
        id:"",
        direction: 'rtl',
        data:[]
      };
    },
    methods: {
      handleClose(done) {
        MessageBox.confirm('确认分配权限？')
          .then(_ => {
            this.handlePermission(this.$refs.tree.getCheckedKeys().join(","));
            done();
          })
          .catch(_ => {this.drawer=false});
      },
     reload:function () {
        this.$emit("reload")
      },
      handlePermission: async function (permission) {
          const res = await api.UPDATE_TREE_PERMISSION({
          id:this.id,
          rolePermission:permission
        })
        if(res.code===200){
        Message({
            showClose: true,
            message: res.message,
            center:true,
            type:"success"
        });
        this.reload()
        }
      }
    }
  };
</script>
<style>
.el-drawer{
    overflow:scroll;
}
</style>