<template>
      <el-pagination
      ref="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      :current-page="data.number"
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
            size:''
        }
    },
    watch:{
            data:function(newData,oldData){
                this.parentData = newData
            }
    },
    methods:{
        handleSizeChange:function(size){
            this.size = size
            this.$emit('resetPage',{page:this.$refs.page.currentPage,limit:size})
        },
        handleCurrentChange:function(currentPage){
            this.$emit('resetPage',{page:currentPage-1,limit:this.size})
        },
        handlePrevClick:function(prePage){
            this.$emit('resetPage',{page:prePage-1,limit:this.size})
        },
        handleNextClick:function(nextPage){
            this.$emit('resetPage',{page:nextPage-1,limit:this.size})
        }
    }
}
</script>