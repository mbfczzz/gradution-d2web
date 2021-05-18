<template>
     <el-button type="primary" @click="uploadExcel">导出excel</el-button>
</template>

<script>
export default {
    name:"uploadExcel",
    props:['columns','data','title'],
    methods:{
        uploadExcel:function(){
            this.$export.excel({
                    columns:this.columns,
                    data:this.data
            })
        }
    }
}
</script>