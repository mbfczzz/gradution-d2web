import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 消息模块
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
      GETMESSAGE_BY_USER(data){
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getMessageByUser',
          method: 'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      CHECK_NOTIFY_LIST(data){
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getAllCheckNotify',
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
      },
      GET_ALL_SOURCE(data){
        return request({
            url: process.env.VUE_APP_MSG+'/notify/getMsgSource',
            method: 'get',
            data
          })
        },
       GET_ALL_SUBJECT(data){
          return request({
              url: process.env.VUE_APP_MSG+'/notify/getSendSubject',
              method: 'get',
              data
            })
          },
       UPDATE_MSG(data){
        return request({
                url: process.env.VUE_APP_MSG+'/notify/updateMessage',
                method: 'post',
                data
              })
            },
      DELETE_MSG(data){
         return request({
                  url: process.env.VUE_APP_MSG+'/notify/deleteMsg/'+data,
                  method: 'delete',
                })
              },
      CHECKOK(data){
        return request({
                 url: process.env.VUE_APP_MSG+'/notify/checkOk/'+data,
                 method: 'PUT',
                       })
              },
      MSGREJECT(data){
        return request({
                url: process.env.VUE_APP_MSG+'/notify/msgReject/'+data,
                method: 'PUT',
                       })
              },  
      GET_MESSAGEBY_NAME(data){
        return request({
          url: process.env.VUE_APP_MSG+'/notify/getMessageByName',
          method: 'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
                })
      }                                                 
    })
    