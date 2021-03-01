export default {
    namespaced:true,
    state:{
        webSocketMsg:''
    },
    mutations:{
       SET_WS_MSG({state,msg}){
            state.webSocketMsg=msg
        }
    }
}