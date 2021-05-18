<template>
  <div class="infinite-list-wrapper" style="overflow:auto;height:700px;text-align:center">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled" 
      infinite-scroll-distance="10px"
      style="margin-right:50px"
      >
          <li>
          <div class="flex" style="font-size:14px">
            <div style="disply:inline-block;width:135.156px">
            <span style="margin-left:10px">发送时间</span>
            </div>
            <div style="width:90px">消息标题</div>
            <div style="font-size:14px">      
             消息状态
            </div>
          </div>  
      </li>
    <li v-for="(v,i) in this.data" class="list-item" :key="i">
          <div class="flex">
          <div>
          <i class="el-icon-message-solid" style="margin-right:5px"></i>
          <!-- <el-avatar :size="20" icon="el-icon-message-solid"></el-avatar> -->  
          <i class="fa fa-clock-o" aria-hidden="true"></i> 
          <span style="margin-left: 10px;font-size:12px">{{v.sendTime}}</span>
          </div>
          <div class="title">
             <el-tooltip class="item" effect="dark" placement="top">
               <div slot="content">
                        <h4>{{v.msgTitle}}</h4>
                        <p>{{v.msgContent}}</p>
              </div>
                  <el-tag
                    v-if="v.msgTitle"
                    effect="plain"
                    type="info">
                    {{v.msgTitle}}
                </el-tag>
            </el-tooltip>
          </div>
          <div>      
            <el-tag
            v-if="v.msgStatus"
            effect="light"
            :type="v.msgStatus==='已审核'?'success':'warning'"
            >
            {{v.msgStatus}}
            </el-tag></div>
        </div>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import api from '@/api';
import { mapState } from 'vuex'
  export default {
    name:"HistoryDeliver",
   data () {
      return {
        count: 10,
        loading: false,
        rule:20,
        data:[]
      }
    },
    computed: {
      noMore () {
        return this.count >= this.rule
      },
      disabled () {
        return this.loading || this.noMore
      },
      ...mapState('d2admin/user',[
                'info'
            ]),
    },
   mounted(){
      this.getMessage()
    },
    methods: {
     async getMessage(){
        const res = await api.GET_MESSAGEBY_NAME(
        {
            page:1,
            limit:this.count,
            id:this.info.user.id
        }
      )
      this.data = res.result.list
      this.rule = res.result.total
     },
     load () {
        this.loading = true
          this.count += 2
          this.getMessage()
          this.loading = false
      }
    }
  }
</script>

<style scoped>
.flex{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
li{
  list-style-type: none;
  border-bottom:#DCDFE6 solid 2px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.el-tag{
  width:90px ;
  overflow: hidden;
}
.title:hover{
    cursor: pointer;
}
</style>