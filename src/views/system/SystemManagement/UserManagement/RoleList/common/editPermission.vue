<template>
<div>
    <el-drawer
    title="角色权限编辑"
    :visible.sync="drawer"
    close-on-press-escape
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
        this.$confirm('确认分配权限？')
          .then(_ => {
            this.handlePermission(this.$refs.tree.getCheckedKeys().join(","));
            done();
          })
          .catch(_ => {});
      },
     reload:function () {
        this.$emit("reload")
      },
      handlePermission: async function (permission) {
          const res = await api.UPDATE_TREE_PERMISSION({
          id:this.id,
          rolePermission:permission
        })
        if(res.code){
        this.$message({
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
  };
</script>
<style>
.el-drawer{
    overflow:scroll;
}
</style>