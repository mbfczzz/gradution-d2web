<template>
    <div class="empy">
        <div class="empy-box">
             <d2-icon-svg v-if="type === 'News'" class="drop-left-icon" :style="{color: iconColor}" name="News"/>
             <d2-icon-svg v-if="type === 'Flag'" class="drop-left-icon" :style="{color: iconColor}" name="Flag"/>
             <d2-icon-svg v-if="type === 'Horn'" class="drop-left-icon" :style="{color: iconColor}" name="Horn"/>
        </div>
        <p>{{text}}</p>
    </div>
</template>

<script>
// 消息图标
export default {
    props:{
        type:{
            type: String,
            default: 'News',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['Flag', 'News','Horn'].indexOf(value) !== -1
            }
        },
        text:{
            type: String,
            default: '你没有新的消息'
        },
    },
    data(){
        return {
            iconColor: "#409EFF", 
        }
    },
}
</script>

<style scoped>
.empy{
    width: 100%;
    height: 330px;
    padding-top: 70px;
    box-sizing: border-box;
}
.empy-box{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}
.empy-icon{
    fill: currentColor;
    color: #DAE0E5;
    width: 85px;
}
.empy p{
    color: #8C8C8C;
    font-size: 14px;
    width: 100%;
    text-align: center;
}
</style>