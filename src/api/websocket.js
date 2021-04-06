import store from '@/store/index'
const WS = {
    id:'',
    $websocket:null, // webscoket实例
    wsUrl: 'ws://localhost:1324/channel', // websocket链接地址
    createWS: function(id){
        if('WebSocket' in window){
            this.$websocket = new WebSocket(this.wsUrl)
            this.id = id
            this.$websocket.onopen = this.wsOpen
            this.$websocket.onmessage = this.wsMessage
            this.$websocket.onerror = this.wsError
            this.$websocket.onclose = this.wsClose
        } else {
            alert('当前浏览器不支持webSocket')
        }
    },

    wsOpen: function() {
        let  con = {
            uid:WS.id,
            message:'连接成功'    
        };
        this.send(JSON.stringify(con))
        console.log('== websocket open ==')
    },

    wsMessage:function(msg) {
        if(msg.data != "服务器连接成功！"){
            store.commit("d2admin/websocket/set",msg.data)
        }
    },

    wsError: function(err){
        console.log('== websocket error ==', err)
    },

    wsClose: function(event){
        console.log('== websocket close ==', event)
    }
}
export default WS
