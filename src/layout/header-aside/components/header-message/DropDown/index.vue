<template>
    <el-tabs class="dropdowns" v-model="activeName"  @tab-click="handleClick"  stretch>
        <el-tab-pane label="通知" name="first" style="padding:0; " class="dropdowns-dropBox">
            <div class="dropdowns-list-box">
              <Drop
              v-for="(k,v) in messages"
              :key=v 
              iconColor='#ffffff' 
              iconBgColor='#3593FE' 
              :title='k.msgTitle' 
              :content='k.msgContent'
              :time='k.sendTime' 
              :read='k.isRead'
              :id='k.id'
              style="background: #AFFCDD" />
              <!-- <Drop type='Email' iconColor='#ffffff' iconBgColor='#3593FE' text='您有一封新邮件,注意查收' time='04-01 12:20' style="background: #AFFCDD" /> -->
              <!-- <el-button class="dropdowns-more"  :loading="true" type="text" disabled>加载更多</el-button> -->
            </div>
            <div class="dropdowns-foots">
                  <d2-icon-svg class="dropdowns-foots-iconsClear" name="Horn"/>
                  清空通知
            </div>
            <Empy type='Horn' text='你还没有新的通知' />
        </el-tab-pane>
        <el-tab-pane label="消息" name="second" style="padding:0"  class="dropdowns-dropBox">
            <div class="dropdowns-list-box">
              <NewsBox text='小明给你发了一条消息' time='04-10 20:20' />
            </div>
            <div class="dropdowns-foots">
                清空通知
            </div>
            <Empy type='News' text='你还没有新的消息' />
        </el-tab-pane>
        <el-tab-pane label="代办" name="third" style="padding:0">
            <div class="dropdowns-list-box">
              <Matter type='info' text='小明给你发了一条消息' time='需要在下午五点前完成' />
            </div>
            <div class="dropdowns-foots">
                清空通知
            </div>
            <Empy type='Flag' text='你还没有新的代办事项' />
        </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api';
// 通知 每一栏
import Drop from './drop'
// 消息 每一栏
import NewsBox from './newsBox'
// 代办 每一栏
import Matter from './matter'
// 空
import Empy from './empy'
export default {
   data() {
      return {
        activeName: 'first',
        dropOff: false,
        messages:[],
        page:1,
        limit:10,
      };
    },
   mounted(){
      this.init()
    },
    components:{
        Drop,
        NewsBox,
        Empy,
        Matter
    },
    watch:{
			message:function(newData){
        this.getMessageByMid(JSON.parse(newData).id)
			}
		},
    computed:{
            ...mapState('d2admin/user',[
                'info'
            ]),
            ...mapState('d2admin/websocket',[
                'message'])
    },    
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getMessageByMid:async function(id){
        const res = await api.GETMESSAGE_BY_CURRENT(id)
        this.messages.push(res.result)
      },
      init: async function(){
          const res = await api.GETMESSAGE_BY_USER({
            page:this.page,
            limit:this.limit,
            id:this.info.user.id
          })
          console.log(res);
          this.messages = res.result.list
      },
      isRead:async function(id){
         const res = await api.UPDATE_USER_MESSAGE({
            id:this.info.user.id,
            mid:id
          })
          alert(res)
      }
    }
}
</script>

<style>
.el-tabs__header{
    margin-bottom: 0!important;
}
.dropdowns-dropBox{
  width: 100%;
  /* min-height: 330px;
  max-height: 450px; */
  max-height: 450px;
  overflow: hidden;
  position: relative;
}
.dropdowns-list-box{
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none; 
  overflow: '-moz-scrollbars-none';
  scrollbar-width: none;  /*  火狐   */
  position: relative;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.dropdowns-list-box::-webkit-scrollbar {
    display: none;  /*  Chrome  */
    width: 0 !important ; /*  Chrome  */
}
.dropdowns-list-box .drop:nth-last-child(1){
  border-bottom: transparent;
}
.dropdowns-dropBox-scroll{
  width: 300px;
  /* height: 328px; */
  
}
.happy-scroll-container{
  width: 300px !important;
}
.happy-scroll-container .happy-scroll-content{
  /* padding-bottom: 38px !important; */
  box-sizing: border-box !important;
  width: 300px !important;
}
.happy-scroll-container{
  height: 290px !important; 
}
.dropdowns-more{
  width: 100%;
  height: 30px;
  color: #2D8CF0;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
 
}
.dropdowns-foots{
  width: 100%;
  height: 38px;
  background: #f7f7f7;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #515A6E;
  border-top: 1px solid #dcdfe6;
  position: absolute;
  bottom: -2px;
  left: 0;
}
.dropdowns-foots-iconsClear{
  width: 16px;
  height: 16px;
  margin-right: 5px;
  color: #515A6E;
  fill: currentColor;
}
.dropdowns-foots:hover{
  /* color: #2AB4FB!important; */
  background: #E8F6FD;
}
.disableds{
  pointer-events: none;
}

</style>