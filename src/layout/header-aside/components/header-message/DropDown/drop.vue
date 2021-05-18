<template>
    <div class="drop">
        <div class="drop-left" :style="{background: iconBgColor}">
            <d2-icon-svg v-if="type === 'Email'" class="drop-left-icon" :style="{color: iconColor}" name="Email"/>
            <d2-icon-svg v-if="type === 'Zhuye'" class="drop-left-icon" :style="{color: iconColor}"  name="Zhuye"/>
            <d2-icon-svg v-if="type === 'Friend'" class="drop-left-icon" :style="{color: iconColor}" name="Friend"/>
            <d2-icon-svg v-if="type === 'Approval'" class="drop-left-icon" :style="{color: iconColor}" name="Approval"/>
            <d2-icon-svg v-if="type === 'Refuse'" class="drop-left-icon" :style="{color: iconColor}" name="Refuse"/>
            <d2-icon-svg v-if="type === 'Favorite'" class="drop-left-icon" :style="{color: iconColor}" name="Favorite"/>
        </div>
        <div class="drop-right">
            <div>{{title}}</div>
            <div class="item">{{content}}</div>
            <div class="time">
               <p>{{time}}</p>
               <p>
                   <el-button v-show="!isRead" type="text" @click="isRead()">未读</el-button>
                   <el-button v-show="isRead" type="text">已读</el-button>
               </p> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type: String,
            default: 'Zhuye',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['Zhuye', 'Email','Friend','Approval','Refuse','Favorite'].indexOf(value) !== -1
            }
        },
        title:{
            type: String,
            default: '没有数据',
            required: true
        },
        content:{
            type: String,
            default: '没用数据',
            required: true
        },
        time:{
            type: String,
            required: true
        },
        isRead:{
            type: String,
            required: true
        },
        
        id:{
            type: String,
            required: true
        },
        iconColor:{
            type: String,
            default: '#ffffff',
            validator: function (value) {
                let colorHtml = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
                let colorRgba = /^[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$/
                // 必须匹配一个颜色的正则
                if(colorHtml.test(value)){
                    return true
                }
                 if(colorRgba.test(value)){
                    return true
                }
                return false;
            }
        },
        iconBgColor: {
            type: String,
            default: '#94E273',
            validator: function (value) {
                let colorHtml = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
                let colorRgba = /^[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$/
                // 必须匹配一个颜色的正则
                if(colorHtml.test(value)){
                    return true
                }
                 if(colorRgba.test(value)){
                    return true
                }
                return false;
            }
        }
    },
    methods:{
        isRead:function () {
            this.$emit("isRead",this.id)
        }
    }
}
</script>

<style scoped>
.drop{
    width: 300px;
    min-height: 65px !important;
    max-height: 100px !important;
    border-bottom: 1px solid #dcdfe6;
    padding: 0px 24px 0px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.drop:hover{
    background: #E2EFFD;
}
.drop:hover .drop-left-icon{
    transform: rotate(360deg);
    opacity: 1;
}
.drop-left{
    width: 32px;
    height: 32px;
    background: burlywood;
    border-radius: 16px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.drop-left-icon{
    width: 20px;
    height: 20px;
    fill: currentColor; 
    opacity: 0.9;
    transition: all 0.5s;
}
.drop-right div{
    text-overflow: ellipsis;
    overflow: hidden;
}
.drop-right div:nth-child(1){
    margin-top:10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #67C23A;
    margin-bottom: 5px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.drop-right{
    width: 268px;
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    flex-wrap:wrap;
    align-items:stretch;
    max-width: 220px;
}
.drop-right div:nth-child(2){
    font-size: 12px;
    color: #606266;
    max-height: 50px;
    margin-bottom: 10px;
    height: 30px;
}
.drop-right div:nth-child(3){
    font-size: 12px;
    color: #808695;
    margin-bottom: 10px;
}
.time{
    display: flex;
    flex-direction: row;
    justify-content: space-between ;
}
.el-button{
    padding: 0 0;
}
p{
    margin: 0 0;
}
</style>