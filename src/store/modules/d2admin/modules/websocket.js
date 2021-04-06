export default {
    namespaced:true,
    state:{
        message:''
    },
    mutations: {
        set (state,msg) {
          state.message = msg
        }
      },   
}