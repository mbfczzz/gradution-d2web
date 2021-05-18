<template>
   <div class="homepage-hero-module">
<el-card class="box-card login">
  <div slot="header" class="head">
    <span>Login</span>
  </div>
  <div style="margin-bottom:20px">
    <el-input v-model="formLogin.username" placeholder="请输入用户名">
      <template slot="prepend">
        <i class="el-icon-user-solid"></i>
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
        <video-background 
        style="max-height: 100%; height: 100vh"
        src="http://mbfczzzz.top/vedio.mp4"
        >
 </video-background>
 </div>
  </div>
</template>

<script>
 import VideoBackground from 'vue-responsive-video-background-player'
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ],
    components:{
        VideoBackground
    },
    data() {
      return {
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
</style>

