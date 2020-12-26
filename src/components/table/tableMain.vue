<template>
  <div>
     <el-table
      :data="tdata.content"
      max-height="600"
      stripe
      :default-sort = "{prop: 'operatorTime', order: 'descending'}"
      style="width: 100%">
    <el-table-column
      type="selection">
    </el-table-column>
    <el-table-column
        prop="operator"
        label="姓名"
        width="180"
        align=center>
    </el-table-column>
    <el-table-column
        prop="operatorIp"
        label="IP"
        align=center>
    </el-table-column>
            <el-table-column
        prop="operatorModel"
        label="操作模块"
        align=center>
    </el-table-column>
    <el-table-column
        prop="operatorTarget"
        label="操作目的"
        align=center>
    </el-table-column>
    <el-table-column
        prop="operatorTime"
        label="操作时间"
        align=center>
      </el-table-column>
    <el-table-column
        prop="requestUrl"
        label="请求地址"
        width="500"
        align=center
        >
    </el-table-column>
    </el-table>  
    <page-info :data="tdata" @resetPage="resetPage" style="margin-top:20px"></page-info>
    </div>
</template>

<script>
import PageInfo from '@/components/table/pageInfo'
export default {
  components: { PageInfo },
    name:"tableMain",
    props:['tdata'],
    data(){
      return{
        
      }
    },
    methods:{
      resetPage:function(data){
        this.$emit("resetPage",data)   
      }
    }
}
</script>

<style scoped>

</style>