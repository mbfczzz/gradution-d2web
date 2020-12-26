<template>
   <div class="homepage-hero-module">
<el-card class="box-card login">
  <div slot="header" class="head">
    <span>Login</span>
  </div>
  <div style="margin-bottom:20px">
    <el-input v-model="formLogin.username" placeholder="请输入用户名">
      <template slot="prepend">
          <d2-icon name="user"/>
       </template>
    </el-input>
    <div style="margin-top:10px"></div>
    <el-input v-model="formLogin.password" show-password placeholder="请输入密码">
       <template slot="prepend">
          <d2-icon name="key"/>
       </template>
      </el-input>
  </div>
  <el-button type="primary" @click="onLogin()">submit</el-button>
</el-card>
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
     <video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
     ></video-player>
    </div>
 </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ],
    components:{
        videoPlayer
    },
    data() {
      return {
        fixStyle: '',
        playerOptions : {
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: 'http://192.168.37.3:1202/bgcvedio.mp4',  // 路径
          type: 'video/mp4'  // 类型
        },],
        // poster: "http://192.168.37.3:1202/bgc.jpg", //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    },
     formLogin: {
        username: '',
        password: ''
      },
      }
    },
      mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
},
methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    /**
     * @description 提交表单
     */
    // 提交登录信息
    onLogin () {
          
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/index')
            })
        }
  }
}
</script>

<style scoped>
  .head{
    text-align: center;
    letter-spacing:20px;
    color:#409EFF;
    font-size: 20px;
  }
  .login{
    opacity:0.8;
    position: absolute;
    width: 350px;
    height: 250px;
    top: 40%;
    left: 40%;
    z-index: 2;
  }
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .video-container video {
    z-index: 0;
    position: absolute;
  }
 
  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
</style>

