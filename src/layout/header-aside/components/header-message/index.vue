<template>
        <div>
                <el-button class="d2-mr btn-text can-hover" type="text">
                            <el-badge is-dot class="item">
                    <i class="el-icon-bell head-news-icon" @mouseover.self="dropShowBtn" style="font-size:19px" @mouseout.self="dropHideBtn"></i>
                           </el-badge>
                </el-button>
         <div class="header-right-dropdown" @mouseover="dropdownBtn" @mouseout="dropShow = false">
                    <el-collapse-transition>
                        <Dropdowns v-show="dropShow" />
                    </el-collapse-transition>
         </div>
        </div>
</template>

<script>
import Dropdowns from './DropDown/index'
export default {
    data(){
        return {
            dropShow: false, // 是否现实通知栏
        }
    },
    computed:{
    getWsMsg (){
        return this.$store.state.webSocketMsg
    }
    },
    watch:{
        getWsMsg:{
            handler: function(newVal) {
                console.log(newVal)
                alert('接收到webSocket推送'+ newVal)
            }
        }
    },
    components:{
        Dropdowns,
    },
    methods:{
        dropdownBtn(){
            clearTimeout(this.setTime)
            this.dropShow = true
        },
            // 展开通知
        dropShowBtn(){
            clearTimeout(this.setTime)
            this.dropShow = true
        },
           // 收起通知
        dropHideBtn(){
            let This = this
            
            this.setTime = setTimeout(function(){
                This.dropShow = false;
            },1000)
        },
    }
}
</script>
<style scoped>
.headers{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.headers-left{
    display: flex;
    justify-content: flex-start;
}
.headers-left-box{
    transition: all 0.5s;
    transform-origin: center center;
    width: 20px;
    height: 100%;
    margin-right: 15px;
}
.headers-left-active{
    transform: rotate(180deg);
}
.el-icon-s-fold{
    width: 20px;
    height: 100%;
    line-height: 50px;
    font-size: 20px;
    cursor: pointer;
    
}
.el-breadcrumb{
    line-height: 50px;
}
.headers-right{
    /* width: 200px; */
    height: 100%;
    /* background: orchid; */
    display: flex;
    justify-content: space-around;
}
.headers-right-left{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 30px;
    font-size: 22px;
    cursor: pointer;
    position: relative;
}
.headers-right-left-screenIcon{
    width: 18px;
    height: 18px;
    margin-right: 10px;
    fill: currentColor; 
    color: #413A3F;
}
.headers-right-left-githubIcon{
    width: 20px;
    height: 20px;
    margin-right: 20px;
    fill: currentColor; 
    color: #413A3F;
}
.header-right-dropdown{
    width: 300px;
    height: auto;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 2;
    background: #ffffff;
    /* padding: 5px 0; */
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    overflow: hidden;
}
/* .head-news-icon{
    
} */
.head-screen{
    margin-right: 15px;
    transform: rotate(45deg);
}
.head-screen-news{
    margin-right: 15px;
}
.headers-right-right{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #666666;
}
.block{
    margin-right: 15px;
}
.el-dropdown-link{
    cursor: pointer;
}
.focusing{
    border: none !important;
}
/* 主题 */
.theme{
    height: 100vh;
    overflow: hidden;
}
.el-drawer__body{
    height: 100vh !important;
    overflow: hidden;
}
.theme-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    padding: 0 15px;
    border-bottom: 1px solid #dcdfe6;
}
.theme-title-box{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: calc(100vh - 51px);
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none; 
    overflow: '-moz-scrollbars-none';
    scrollbar-width: none;  /*  火狐   */
    background: #F5F7F9;
}
.theme-title-box::-webkit-scrollbar {
    display: none;  /*  Chrome  */
    width: 0 !important ; /*  Chrome  */
}
.theme-title-box-list{
    width: 180px;
    height: 150px;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    background: #999999;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    border: 5px solid transparent;
}
.theme-title-box-list-left{
    width: 30px;
    height: 120px;
}
.theme-title-box-list-right{
    flex: 1;
    height: 160px;
}
.theme-title-box-list-right-top{
    width: 100%;
    height: 20px;
    background: #ffffff;
}
.theme-title-box-list-right-bottom{
    width: 100%;
    height: 100px;
}
.theme-active{
    border: 5px solid #05DA89;
}
</style>