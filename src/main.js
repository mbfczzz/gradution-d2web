// Vue
import Vue from 'vue'
import vueTableExport from '@d2-projects/vue-table-export'
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'
import WS from '@/api/websocket'
Vue.prototype.$ws = WS
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import App from './App'


// 核心插件
Vue.use(d2Admin)
Vue.use(vueTableExport)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),  
  mounted () {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if(matched ===[]){
          return
        }
        let menuAside = JSON.parse(window.localStorage.getItem("allmenu"))
        if (matched.length > 0) {
          if(matched[0].path === "/login" || matched[0].path === "/register" || matched[0].path==="") 
          return
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }  
      },
      immediate: true
    }
    
  }
}).$mount('#app')
