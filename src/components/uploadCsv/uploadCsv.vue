<template>
     <el-button type="primary" @click="uploadCsv">导出Csv{{title}}</el-button>
</template>

<script>
export default {
    name:"uploadCsv",
    props:['columns','data','title'],
    methods:{
        uploadCsv:function(){
            this.$export.csv({
                    columns:this.columns,
                    data:this.data
            })
        }
    }
}
</script>