import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 消息模块
       * @param {FormData} data 
       */
        GET_REFUND_WAY(data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/refundway/getRefundWay',
          method: 'GET',
          data
        })
      },
       REFUNDWAY_LIST (data) {
            return request({
              url: process.env.VUE_APP_ADMIN+'/refundway/getAllRefundWay',
              method:'post',
              type:'application/x-www-form-urlencoded',
              data:Qs.stringify(data)
            })
          },
       UPDATE_REFUNDWAY(data){
            return request({
              url: process.env.VUE_APP_ADMIN+'/refundway/updateRefundWay',
              method:'put',
              data
            })
            },
      DELETE_REFUNDWAY(data){
              return request({
                url: process.env.VUE_APP_ADMIN+'/refundway/deleteRefundWay/'+data,
                method:'delete',
            })
            },  
       ADD_REFUNDWAY(data){
              return request({
                url: process.env.VUE_APP_ADMIN+'/refundway/addRefundWay',
                method:'post',
                data
            })
            }                                            
    })
    