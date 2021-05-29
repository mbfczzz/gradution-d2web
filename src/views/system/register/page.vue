<template>
   <div class="homepage-hero-module">     
<p class="logo">企业人事管理系统</p>    
<el-card class="box-card login">
  <div slot="header" class="head">
    <span>Register</span>
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
<el-upload
  class="avatar-uploader"
  :action="ossUploadUrl"
  :show-file-list="false"
  :data="dataObj"
  :before-upload="beforeUpload"
  :on-success="handleUploadSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <el-button type="primary" @click="register()">submit</el-button>
</el-card>
    <div class="video-container">
        <video-background 
        style="max-height: 100%; height: 100vh"
        poster="http://mbfczzzz.top/ocean-1867285.jpg"
        src="http://mbfczzzz.top/vedio.mp4"
        >
 </video-background>
 </div>
  </div>
</template>

<script>
import api from '@/api'
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
        cdnHost:'http://mbfczzzz.top/',
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
      ossUploadUrl:'http://graution.oss-cn-beijing.aliyuncs.com',      
      imageUrl:'',
      formLogin: {
        username: '',
        password: ''
      },
      }
    },
methods: {
      beforeUpload(file) {
        let filename = file.name
        return new Promise((resolve, reject) => {
          api.OSS_POLICY().then(response => {
            this.dataObj.policy = response.result.policy;
            this.dataObj.signature = response.result.signature;
            this.dataObj.ossaccessKeyId = response.result.accessKeyId;
            this.dataObj.key = response.result.dir +'/' + filename;
            this.dataObj.dir = response.result.dir;
            this.dataObj.host = response.result.host;
            // this.dataObj.callback = response.result.callback;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      register:async function(){
            const data =  await api.USER_REGISTER({
              username:this.formLogin.username,
              password:this.forLogin.password,
              image:this.imageUrl
            })
        if(data.code===200){
          this.$router.push("login")
        }
      },
      handleUploadSuccess(res, file) {
        this.imageUrl = this.cdnHost+ '/' + this.dataObj.dir + '/' + file.name;
      },
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

<style>
  .logo{
        letter-spacing:13px;
        position: absolute;
        z-index: 2;
        width: 350px;
        top: 10%;
        left: 40%;
        color:#409EFF;
        text-shadow: 0 0 20px #409EFF;
        font: 30px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
        text-align: center;
  }
  .head{
    text-align: center;
    letter-spacing:20px;
    color:#409EFF;
    font-size: 20px;
  }
  .el-upload{
    display:block
  }
  .login{
    opacity:0.8;
    position: absolute;
    width: 350px;
    top: 20%;
    left: 40%;
    z-index: 2;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 308px;
    height: 178px;
    line-height: 178px;
    text-align: center;  
  }
  .el-upload{
    margin: auto 0;
  }
  .avatar {
    width: 308px;
    height: 178px;
    display: block;
  }
</style>

