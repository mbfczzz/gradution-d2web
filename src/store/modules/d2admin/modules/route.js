import {addIndex,getPermission,createRoute} from '@/api/tools'
import router from  '@/router' 
import api from '@/api'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export default {
    namespaced:true,
    state:{
        route:[]
    },
     actions:{
        async  getRoute({dispatch,state}){
            const res = await api.USER_USERINFO()
            let index = addIndex(res.result.head)
            localStorage.setItem("head",JSON.stringify(index))
            let arr = getPermission(res.result.head,res.result.side)
            localStorage.setItem("allmenu", JSON.stringify(arr))
            let routeTable = createRoute(arr)
            routeTable.push({path:'*',name:'404',component:_import('system/error/404')})
            state.route = routeTable
            router.addRoutes(routeTable)
            await dispatch('d2admin/account/load',null,{root:true})
            await dispatch('d2admin/user/set', { user: res.result.user}, { root: true })
            // 设置 vuex 用户信息
        },
        routeset({state}){
            state.route=[]
        }
    }
}