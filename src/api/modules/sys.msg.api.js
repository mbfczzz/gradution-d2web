import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
        NOTIFY_LIST (data) {
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getAllNotify',
          method: 'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      SEND_WAY (data) {
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getSendWay',
          method: 'get',
          data
        })
      },
      GET_TEMPLATE (data) {
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getNotifyTemplate',
          method: 'get',
          data
        })
      },
      GET_CURRENT_TEMPLATE(data){
        if(data!=""){
          data = "/"+data
      }
      return request({
          url: process.env.VUE_APP_MSG+'/notify/getCurrentTemplate'+data,
          method: 'get',
          data
        })
      },
      SEND_MESSAGE(data){
      return request({
          url: process.env.VUE_APP_MSG+'/notify/sendMessage',
          method: 'post',
          data
        })
      }
    })
    