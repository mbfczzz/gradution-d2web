<template>
      <el-pagination
      ref="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      :current-page="data.number+1"
      background
      :page-sizes="[10,50,100, 1000,5000,10000]"
      :page-size="data.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.totalElements">
    </el-pagination> 
</template>

<script>
export default {
    name:"pageInfo",
    props:['data'],
    data(){
        return{
            parentData : {},
        }
    },
    watch:{
            data:function(newData,oldData){
                this.parentData = newData
            }
    },
    methods:{
        handleSizeChange:function(size){
            this.$emit('resetPage',{page:this.parentData.number+1,limit:size})
        },
        handleCurrentChange:function(currentPage){
            this.$emit('resetPage',{page:currentPage,limit:this.parentData.size})
        },
        handlePrevClick:function(prePage){
            this.$emit('resetPage',{page:prePage,limit:this.parentData.size})
        },
        handleNextClick:function(nextPage){
            this.$emit('resetPage',{page:nextPage,limit:this.parentData})
        }
    }
}
</script>