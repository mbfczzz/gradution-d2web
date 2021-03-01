import store from '../store'

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
        debugger
        let  con = {
            uid:WS.id,
            message:'连接成功'    
        };
        this.send(JSON.stringify(con))
        console.log('== websocket open ==')
        heartBeat.start()
    },

    wsMessage:function(msg) {
        console.log('== websocket message ==', msg)
        heartBeat.reset()
        store.commit('d2admin/websocket/SET_WS_MSG', msg.data)
    },

    wsError: function(err){
        console.log('== websocket error ==', err)
    },

    wsClose: function(event){
        console.log('== websocket close ==', event)
    }
}

const heartBeat = {
    timeout:30000, // 心跳重连时间
    timeoutObj:null, // 定时器
    reset:function(){
        clearInterval(this.timeoutObj)
        console.log('websocket 心跳')
        console.log(WS);
        this.start()
    },
    start:function(){
        this.timeoutObj = setTimeout(function(){
            if(WS.$websocket.readyState === 1){
                let heart = {
                    id:WS.id,
                    heart:'HeartBeat'
                }
                WS.$websocket.send(JSON.stringify(heart))
            }
        },this.timeout)
    }
}
export default WS
